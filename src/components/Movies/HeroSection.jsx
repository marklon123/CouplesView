import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { Image } from '../../../public/assets/exportImage';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const APIkey = '16c33270f6f778e73c12b9956272092f';
const Base_url = 'https://api.themoviedb.org/3';

function HeroSection() {
    const [showArrow, setShowArrow] = useState(false);
    const [infinite, setInfinite] = useState(true);
    const [toggleScroll, setToggleScroll] = useState(true);

    const [medias, setMedias] = useState([]);
    const [mediaExtended, setMediaExtended] = useState({});

    useEffect(() => {
        const GetMedias = async () => {
            try {
                const response = await fetch(`${Base_url}/trending/all/week?api_key=${APIkey}`);
                const data = await response.json();
                setMedias(data.results);
            } catch (error) {
                console.error("Error fetching medias:", error);
            }
        };
        GetMedias();
    }, []);

    useEffect(() => {
        const fetchMedia = async () => {
            const Promises = medias.map(async (media) => {
                try {
                    // Determine whether the media is a movie or TV show
                    const mediaType = media.media_type; // Fallback to the trending state if `media.media_type` is not available
                    const response = await fetch(`${Base_url}/${mediaType}/${media.id}?api_key=${APIkey}`);
                    const data = await response.json();
                    return { id: media.id, title: data.title ? data.title : data.name ? data.name : "N/A", overview: data.overview, image: data.poster_path, imageBackDrop: data.backdrop_path };
                } catch (error) {
                    console.error("Error fetching media details:", error);
                    return { id: media.id, title: "N/A", overview: "N/A", image: null, imageBackDrop: null };
                }
            });

            const Data = await Promise.all(Promises);
            const Map = {};
            Data.forEach(({ id, overview, image, imageBackDrop, title }) => {
                Map[id] = {
                    id: id,
                    title: title,
                    overview: overview,
                    image: image,
                    imageBackDrop: imageBackDrop
                }
            });
            setMediaExtended(Map);
        };

        if (medias.length > 0) {
            fetchMedia();
        }
    }, [medias]);

    useEffect(() => {
        function toggleInfinite() {
            if (medias.length <= 1) {
                setInfinite(false);
            } else {
                setInfinite(true);
            }
        }

        toggleInfinite();
    }, [medias]);

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;

        // Remove 'slick-prev' from className
        const newClassName = className.replace("slick-prev", "").trim();

        return (
            <div
                className={`${newClassName} prevArrow`}
                style={{ ...style }}
                onClick={onClick}
            >
                <ArrowLeftIcon />
            </div>
        );
    }

    const PrevInvisibleArrow = (props) => {
        const { className, style, onClick } = props;

        const newClassName = className.replace("slick-prev", "").trim();

        return (
            <div
                className={`${newClassName} prevArrowInvisible`}
                style={{ ...style }}
                onClick={onClick}
            >
            </div>
        );
    }

    const NextArrow = (props) => {
        const { className, style, onClick } = props;

        // Remove 'slick-next' from className
        const newClassName = className.replace("slick-next", "").trim();

        return (
            <div
                className={`${newClassName} nextArrow`}
                style={{ ...style }}
                onClick={onClick}
            >
                <ArrowRightIcon />
            </div>
        );
    }

    const NextInvisibleArrow = (props) => {
        const { className, style, onClick } = props;

        const newClassName = className.replace("slick-next", "").trim();

        return (
            <div
                className={`${newClassName} nextArrowInvisible`}
                style={{ ...style }}
                onClick={onClick}
            >
            </div>
        );
    }

    const CustomDots = ({ dots, className }) => {
        const [statefulClassName, setStatefullClassName] = useState("absolute bottom-10 left-1 md:left-3");

        useEffect(() => {
            function setConfigureClassName() {
                if (window.innerWidth <= 768) {
                    setStatefullClassName(statefulClassName.replace("bottom-10", "bottom-7"));
                } else {
                    setStatefullClassName(statefulClassName.replace("bottom-7", "bottom-10"));
                }
            }

            setConfigureClassName();

            window.addEventListener("resize", setConfigureClassName);

            return () => {
                window.removeEventListener("resize", setConfigureClassName);
            }
        }, []);

        return (<div className={`${statefulClassName}`}>
            <ul className={`${className} flex sm:flex-col`}>{dots}</ul>
        </div>);
    };

    useEffect(() => {
        const SpeedUpScroll = () => {
            if (toggleScroll) {
                setTimeout(() => {
                    setToggleScroll(false);
                }, 50)
            }
        }

        SpeedUpScroll();
    }, [])


    const settings = {
        arrow: showArrow,
        dots: true,
        infinite: infinite,
        prevArrow: showArrow ? <PrevArrow /> : <PrevInvisibleArrow />,
        nextArrow: showArrow ? <NextArrow /> : <NextInvisibleArrow />,
        draggable: true,
        autoplay: true,
        autoplaySpeed: toggleScroll ? 50 : 4000,
        appendDots: (dots) => <CustomDots dots={dots} />
    }

    const TruncatedText = ({ text, count, ShowfullText, breakpoint, newCount }) => {
        const [className, setClassName] = useState('');
        const [truncatedText, setTruncatedText] = useState('');

        const preClass = "truncatedText-moviesHero px-3 text-tertiary text-center mb-4 sm:w-[80%]";

        // Function to update className based on window width
        function updateClassName() {
            if (window.innerWidth <= 450) {
                setClassName(`${preClass} text-xs`);
            } else if (window.innerWidth > 450 && window.innerWidth <= 640) {
                setClassName(`${preClass} text-sm`);
            } else {
                setClassName(`${preClass} text-base`);
            }
        }

        // Effect for managing the truncated text and className
        useEffect(() => {
            updateClassName();

            function Truncate() {
                let limit = window.innerWidth <= breakpoint ? newCount : count;
                let transformedText = text?.substring(0, limit) || '';

                // Add ellipsis if the text is truncated
                setTruncatedText(text.length > transformedText.length ? transformedText.trim().concat("...") : text);
            }

            // Initial call
            Truncate();

            function handleResize() {
                updateClassName();
                Truncate();
            }

            // Add event listener for resize
            window.addEventListener("resize", handleResize);

            // Cleanup listener on unmount
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, [text, count, newCount, breakpoint]);

        // Render full text if ShowfullText is true
        if (ShowfullText) {
            return <p className={className}>{text}</p>;
        }

        // Render truncated text
        return <p className={className}>{truncatedText}</p>;
    };

    const RenderMedias = () => {
        const localmedias = medias.slice(0, 6);
        const DynamicMedia = localmedias.map((media) => {
            const currentMedia = mediaExtended[media.id] ?? null;
            return (
                <div key={media.id} className="relative trendingCard h-[85vh] min-h-[280px] max-h-[290px] md:max-h-[350px] lg:max-h-[450px] xl:max-h-[550px]">
                    <img loading="lazy" src={`https://image.tmdb.org/t/p/w500/${currentMedia?.image}`} className="absolute w-full h-full object-cover object-center rounded-lg blur opacity-60" />
                    <div className="relative flex h-full">
                        <div className="w-1/2 sm:w-[60%] md:w-[70%] flex flex-col justify-center items-center p-1">
                            <h1 className="trendingCard-header leading-tight sm:leading-none cursor-default text-center text-lg sm:text-2xl md:text-3xl 2xl:text-4xl text-tertiary font-medium mb-3 px-1">{currentMedia?.title}</h1>
                            <TruncatedText text={`${currentMedia?.overview}`} count={140} breakpoint={640} newCount={30} />
                            <div className="flex flex-col sm:flex-row items-center *:inline-block *:cursor-pointer *:text-sm *:sm:text-lg *:lg:text-xl *:sm:px-5 *:sm:py-2 *:lg:py-3 *:font-medium">
                                <a className="px-3 py-1 sm:px-0 sm:py-0 sm:p-0 sm:mr-5 mb-2 sm:mb-0 text-tertiary bg-cta rounded-lg sm:border-2 border-tertiary border-opacity-10 transition-colors duration-200 ease-in hover:bg-cta_hover">Watch Now</a>
                                <a className="px-5 py-1 sm:px-0 sm:py-0 text-cta font-medium bg-tertiary bg-opacity-80 rounded-lg">Details</a>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-[40%] md:w-[30%]">
                            <img src={`https://image.tmdb.org/t/p/w500/${currentMedia?.image}`} className="trendingImage h-full w-full object-cover object-left-center sm:object-center" />
                        </div>
                    </div>
                </div>
            )
        });

        return DynamicMedia;
    }

    function lazyLoadRenderedMedias() {
        const check = () => {
            if (medias.length === 0) {
                return (
                    <>
                        <div className="mb-5 h-[85vh] min-h-[280px] max-h-[290px] md:max-h-[350px] lg:max-h-[450px] xl:max-h-[550px] bg-tertiary bg-opacity-70">
                        </div>
                    </>
                )
            }
        }
        return check();
    }



    return (
        <section className="flex justify-center">
            <div className="container">
                <Slider {...settings} className="slider cursor-grab bg-opacity-10">
                    {lazyLoadRenderedMedias()}
                    {RenderMedias()}
                </Slider>
            </div>
        </section>
    )
}

export default HeroSection