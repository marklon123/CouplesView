function HeroSection() {
    return (
        <section className="relative flex justify-center w-full h-screen min-h-[550px] max-h-[550px]">
            <div className="absolute heroSection inset-0 opacity-85"></div>
            <div className="container relative flex items-center justify-center h-[500px]">
                <div className="relative border-2 border-tertiary border-opacity-20 py-4 px-4 sm:py-6 sm:px-8 w-[50%] watchNow sm:w-auto rounded-lg">
                    <div className="absolute inset-0 opacity-75 bg-secondary rounded-lg"></div>
                    <div className="relative space-y-2 sm:space-y-3 lg:space-y-4 text-center">
                        <h1 className="GrowBond text-cta font-medium text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">Grow your bond!</h1>
                        <p className="hero-cta text-tertiary lg:text-md xl:text-lg 2xl:text-xl font-medium">Click down below to get started.</p>
                        <p className="text-cta font-medium">{'(one month free trial)'}</p>
                        <a href="/movies" className="block cursor-pointer bg-cta transition-colors duration-200 ease-in hover:bg-cta_hover text-tertiary rounded-md p-2 w-full sm:w-auto sm:px-24 lg:px-32 md:text-lg 2xl:text-xl font-medium">Watch Together</a>
                    </div>
                </div>
            </div>
        </section>  
    )
}

export default HeroSection