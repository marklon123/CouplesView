import React, { useEffect } from 'react';

function HowTo() {

    useEffect(() => {
        const cardContainer = document.getElementById("card-container");
        const cardContainerChildren = Array.from(cardContainer.getElementsByClassName("card"));
        const firstCard = cardContainerChildren[0];

        const resizeCards = () => {
            const firstCardWidth = getComputedStyle(firstCard).width;

            cardContainerChildren.forEach((card) => {

                if ((firstCard && firstCard.offsetTop !== card.offsetTop) && window.innerWidth > 420) {
                    if (card !== firstCard) {
                        card.classList.remove("flex-1");
                        card.style.width = firstCardWidth;
                    }
                } else {
                    card.classList.add("flex-1");
                }
            });
        }

        const reCallResizeCards = () => {
            if (window.innerWidth < 420) {
                cardContainerChildren.forEach((card) => {
                    card.classList.remove("flex-1");
                    card.style.width = "100%";
                });
            }
        }

        resizeCards();
        reCallResizeCards();

        window.addEventListener("resize", resizeCards);
        window.addEventListener("resize", reCallResizeCards);

        return () => {
            window.removeEventListener("resize", resizeCards);
            window.removeEventListener("resize", reCallResizeCards);
        }
    }, []);

    return (
        <section className="flex flex-col items-center sm:pb-[50px]">
            <h2 className="getStarted-heading w-full text-center text-secondary text-3xl md:text-4xl 2xl:text-5xl py-[20px]">Get Started</h2>
            <div className="container flex flex-col items-center">
                <div id="card-container" className="flex flex-wrap justify-center mt-[40px] px-2">
                    <div className="card flex-1 min-w-[200px] max-w-[270px] text-center rounded-2xl m-2 sm:m-4">
                        <h3 className="card-heading font-medium text-2xl md:text-3xl text-cta p-2 border-b-2 border-b-cta border-opacity-15">Step 1</h3>
                        <div className="relative h-[240px] sm:h-[270px] max-h-[300px]">
                            <div className="absolute inset-0 bg-secondary opacity-15"></div>
                            <p className="text-start text-lg xl:text-xl py-2 px-3 text-tertiary overflow-y-auto">
                                Create your account and select the plan that suits your needs. Whether you're a
                                casual viewer or love having movie nights often, we’ve got a plan for you.
                            </p>
                        </div>
                        <a className="card-cta py-3 block text-xl lg:text-2xl bg-cta text-tertiary">Sign Up Now</a>
                    </div>
                    <div className="card flex-1 min-w-[200px] max-w-[270px] text-center rounded-2xl m-2 sm:m-4">
                        <h3 className="card-heading font-medium text-2xl md:text-3xl text-cta p-2 border-b-2 border-b-cta border-opacity-15">Step 2</h3>
                        <div className="relative h-[240px] sm:h-[270px] max-h-[300px]">
                            <div className="absolute inset-0 bg-secondary opacity-15"></div>
                            <p className="text-start text-lg xl:text-xl py-2 px-3 text-tertiary overflow-y-auto">
                             Explore our collection of movies. From blockbusters to indie gems,
                             you'll find something for every mood and genre.
                            </p>
                        </div>
                        <a href="/movies" className="card-cta py-3 block text-xl lg:text-2xl bg-cta text-tertiary">Browse Movies</a>
                    </div>
                    <div className="card flex-1 min-w-[200px] max-w-[270px] text-center rounded-2xl m-2 sm:m-4">
                        <h3 className="card-heading font-medium text-2xl md:text-3xl text-cta p-2 border-b-2 border-b-cta border-opacity-15">Step 3</h3>
                        <div className="relative h-[240px] sm:h-[270px] max-h-[300px]">
                            <div className="absolute inset-0 bg-secondary opacity-15"></div>
                            <p className="text-start text-lg xl:text-xl py-2 px-3 text-tertiary overflow-y-auto">
                            Found a movie? Create a virtual room and invite your partner. Watch together, no matter the 
                            distance, with synced streaming and chat options.
                            </p>
                        </div>
                        <a className="card-cta py-3 block text-xl lg:text-2xl bg-cta text-tertiary">Create Your Room</a>
                    </div>
                    <div className="card flex-1 min-w-[200px] max-w-[270px] text-center rounded-2xl m-2 sm:m-4">
                        <h3 className="card-heading font-medium text-2xl md:text-3xl text-cta p-2 border-b-2 border-b-cta border-opacity-15">Step 4</h3>
                        <div className="relative h-[240px] sm:h-[270px] max-h-[300px]">
                            <div className="absolute inset-0 bg-secondary opacity-15"></div>
                            <p className="text-start text-lg xl:text-xl py-2 px-3 text-tertiary overflow-y-auto">
                            Sit back, relax, and enjoy the movie in real-time with your partner. Share reactions through
                             chat and experience movies as if you were side by side.
                            </p>
                        </div>
                        <a className="card-cta py-3 block text-xl lg:text-2xl bg-cta text-tertiary">Start Watching</a>
                    </div>                   
                </div>
            </div>
        </section>
    )
}

export default HowTo