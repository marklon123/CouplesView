import React, { useEffect, useState, useRef } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

const APIkey = '16c33270f6f778e73c12b9956272092f';
const Base_url = 'https://api.themoviedb.org/3';

const TruncatedText = ({ text, cardWidth, card }) => {
    const [className, setClassName] = useState('');
    const [truncatedText, setTruncatedText] = useState('');

    useEffect(() => {
        const setCardClass = () => {
            const width = window.innerWidth;
            const sizeClass =
                width <= 450 ? "text-xs" :
                    width <= 650 ? "text-sm" : "text-base";
            setClassName(`MovieCardTitle text-tertiary ${sizeClass} inline`);
        };

        setCardClass();
        window.addEventListener("resize", setCardClass);

        return () => window.removeEventListener("resize", setCardClass);
    }, []);

    useEffect(() => {
        const truncateText = () => {
            if (!card || !text) return;

            const paddingLeft = parseInt(getComputedStyle(card).paddingLeft, 10) || 0;
            const paddingRight = parseInt(getComputedStyle(card).paddingRight, 10) || 0;
            const title = card.querySelector(".MovieCardTitle");
            const availableWidth = cardWidth - paddingLeft - paddingRight;

            if (title) {
                let currentText = text;
                title.textContent = currentText;
                while (title.scrollWidth > availableWidth && currentText.length > 0) {
                    currentText = currentText.slice(0, -1).trim();
                    title.textContent = `${currentText}...`;
                }
                setTruncatedText(currentText.length < text.length ? `${currentText}...` : text);
            }
        };

        // Delay truncation slightly to ensure that the DOM has fully rendered
        setTimeout(truncateText, 100);

        window.addEventListener("resize", truncateText);
        return () => window.removeEventListener("resize", truncateText);
    }, [text, card, cardWidth]);

    return <p className={className}>{truncatedText}</p>;
};

function Trending() {
    const [medias, setMedias] = useState([]);
    const [mediaRuntimes, setMediaRuntimes] = useState({});
    const [mediaImages, setMediaImages] = useState({});
    const [trending, setTrending] = useState('movie');
    const cardRefs = useRef([]);

    const [cardWidths, setCardWidths] = useState([]);

    // Fetch trending data
    useEffect(() => {
        const fetchMedias = async () => {
            try {
                const response = await fetch(`${Base_url}/trending/${trending}/week?api_key=${APIkey}`);
                const data = await response.json();
                setMedias(data.results || []);
            } catch (error) {
                console.error("Error fetching medias:", error);
            }
        };
        fetchMedias();
    }, [trending]);

    // Fetch additional media details
    useEffect(() => {
        const fetchMediaDetails = async () => {
            const detailsPromises = medias.map(async (media) => {
                try {
                    const mediaType = media.media_type || trending;
                    const response = await fetch(`${Base_url}/${mediaType}/${media.id}?api_key=${APIkey}`);
                    const data = await response.json();
                    return { id: media.id, runtime: data.runtime || data.episode_run_time?.[0] || 'N/A', imagePath: data.poster_path };
                } catch (error) {
                    console.error("Error fetching media details:", error);
                    return { id: media.id, runtime: 'N/A', imagePath: null };
                }
            });

            const detailsData = await Promise.all(detailsPromises);
            const runtimes = {};
            const images = {};
            detailsData.forEach(({ id, runtime, imagePath }) => {
                runtimes[id] = runtime;
                images[id] = imagePath;
            });
            setMediaRuntimes(runtimes);
            setMediaImages(images);
        };

        if (medias.length > 0) {
            fetchMediaDetails();
        }
    }, [medias]);

    // Update card widths on window resize
    useEffect(() => {
        const updateCardWidths = () => {
            const widths = cardRefs.current.map(card => {
                const movieCard = card?.querySelector(".MovieCard");
                return movieCard ? movieCard.clientWidth : 0;
            });
            setCardWidths(widths);
        };

        updateCardWidths();
        window.addEventListener("resize", updateCardWidths);

        return () => window.removeEventListener("resize", updateCardWidths);
    }, [medias]);

    const RenderTrendingMedia = () => {
        return medias.slice(0, 7).map((media, index) => {
            const year = media.release_date ? new Date(media.release_date).getFullYear() :
                media.first_air_date ? new Date(media.first_air_date).getFullYear() : 'N/A';
            const runtime = mediaRuntimes[media.id] ?? 'N/A';

            return (
                <div key={media.id} ref={el => cardRefs.current[index] = el} className="trendingMovieCard relative min-w-[120px] p-2 bg-primary bg-opacity-55 rounded-lg">
                    <a className="absolute z-30 cardPlay inset-0 bg-cta bg-opacity-20 rounded-lg opacity-0 hover:opacity-100 transition duration-300 ease-in flex items-center justify-center cursor-pointer">
                        <PlayIcon className="relative w-20 text-cta" />
                    </a>
                    <div className="absolute z-20 top-0 left-0">
                        <p className="trendingMovieCard-quality p-2 bg-primary text-tertiary font-medium text-xs sm:text-base">HD</p>
                    </div>
                    <div className="trendingMovieCard-ImageContainer rounded-lg overflow-hidden h-[220px]">
                        <img loading="lazy" className="w-full relative z-10 h-full object-cover" src={`https://image.tmdb.org/t/p/w500/${mediaImages[media.id]}`} alt={media.title || media.name} />
                    </div>
                    <div className="MovieCard">
                        <div className="flex flex-col items-center justify-center my-1 sm:my-2">
                            <div className={`${media.title || media.name ? "bg-primary" : ""} rounded-lg p-[2px] lg:p-[3px] md:pb-1 w-full flex items-center justify-center`}>
                                <TruncatedText
                                    text={media.title || media.name}
                                    cardWidth={cardWidths[index]}
                                    card={cardRefs.current[index]}
                                />
                            </div>
                            <div className="mt-1">
                                <span className="flex items-center">
                                    <p className="cardTime text-tertiary text-[11px] sm:text-sm">{`${runtime} min`}</p>
                                    <i className="fa-solid fa-circle text-tertiary text-[2px] sm:text-[3px] mx-2"></i>
                                    <p className="cardYear text-secondary text-[11px] sm:text-sm">{`${year}`}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleTrendingUpdate = (e) => {
        const trendingHeadings = document.querySelectorAll(".trendingHeading-filter");

        const active = "bg-cta text-tertiary";
        const inactive = "bg-tertiary bg-opacity-30 text-cta";

        if (trendingHeadings.length > 0) {
            trendingHeadings.forEach((heading) => {
                if (heading.classList.contains(...active.split(" "))) {
                    heading.classList.remove(...active.split(" "));
                    heading.classList.add(...inactive.split(" "));
                }
            });
            e.target.classList.remove(...inactive.split(" "));
            e.target.classList.add(...active.split(" "));


            setTrending(p => p = e.target.value);
        }
    }

    const mediasReplacement = () => {
        if (medias.length === 0) {
            const elements = [];
            for (let i = 0; i < 6; i++) {
                elements.push(
                    <div key={i} className="min-w-[120px] h-[160px] sm:h-[200px] p-2 bg-primary bg-opacity-55 rounded-lg">
                    </div>
                );
            }
            return elements;
        }
    };


    return (
        <section className="flex justify-center px-2">
            <div className="container relative mt-[30px] mb-[20px] sm:mt-[50px] sm:mb-[30px] p-2">
                <div className="absolute inset-0 bg-primary_variant rounded-lg"></div>
                <div className="heading relative">
                    <h1 className="trendingHeading mt-2 text-tertiary text-lg md:text-2xl 2xl:3xl font-medium">Trending</h1>
                    <div className="inline-block trendingHeading rounded-lg overflow-hidden *:py-1 *:px-2 *:sm:px-3 *:text-sm *:sm:text-lg mt-2 *:transition-colors *:duration-100 *:ease-in">
                        <button onClick={handleTrendingUpdate} className="trendingHeading-filter bg-cta text-tertiary" value="movie">Movies</button>
                        <button onClick={handleTrendingUpdate} className="trendingHeading-filter bg-tertiary bg-opacity-30 text-cta" value="tv">TV Shows</button>
                    </div>
                    <div className="TrendingListing mt-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2">
                        {mediasReplacement()}
                        {RenderTrendingMedia()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Trending;
