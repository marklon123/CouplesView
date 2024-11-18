import { Image } from "../../../public/assets/exportImage";

function Footer() {
    return (
        <section className="flex justify-center px-2">
            <footer className="flex footer flex-col justify-between mt-[50px] mb-2 text-tertiary bg-footer container rounded-lg border-2 border-tertiary border-opacity-10 p-2 pb-0 sm:p-[20px] sm:pb-0">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-[100%] sm:w-[30%]">
                        <div className="flex items-center mb-2">
                            <div className="mr-4 object-cover w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] 2xl:w-[80px] 2xl:h-[80px] rounded-full">
                                <Image imageName="logo.png" className="h-full w-full rounded-full " />
                            </div>
                            <div className="link-icons space-x-2 text-secondary">
                                <a href="" className="text-2xl hover:text-tertiary transition-colors duration-200 ease-in"><i className="fa-brands fa-instagram"></i></a>
                                <a href="" className="text-2xl hover:text-tertiary transition-colors duration-200 ease-in"><i className="fa-brands fa-facebook"></i></a>
                                <a href="" className="text-2xl hover:text-tertiary transition-colors duration-200 ease-in"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                        </div>
                        <div className="Quote">
                            <p className="">Discover the best movies, reviews, and exclusive content at CouplesView.
                                Stay updated with the latest in cinema, from blockbuster hits to indie gems.
                                Explore our curated collections.
                            </p>
                        </div>
                    </div>
                    <div className="linkContainer w-[100%] sm:w-[30%] mt-5 sm:mt-0 sm:text-center">
                        <h1 className="mb-2 sm:mb-5 text-lg font-medium">Explore</h1>
                        <ul className="explore_links">
                            <li><a>Home</a></li>
                            <li><a>Movies</a></li>
                            <li><a>Genre</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <div className="linkContainer w-[100%] sm:w-[30%] mt-5 sm:mt-0">
                        <h1 className="mb-2 sm:mb-5 text-lg font-medium">Contact</h1>
                        <ul className="contact">
                            <li className="flex no-wrap text-md font-medium">
                                Address:
                                <address>
                                    <a href="geo:" className="text-base font-thin ml-1">1234 Cinema Boulevard, Suite 500
                                        Film City, CA 90210
                                        United States</a>
                                </address>
                            </li>
                            <li className="text-md font-medium whitespace-nowrap">Tel: <a href="tel:(876)338-7644" className="text-base font-thin ml-1">(876)338-7644</a></li>
                            <li className="text-md font-medium whitespace-nowrap">Email: <a href="mailto:marklon567@gmail.com" className="text-base font-thin ml-1">marklon567@gmail.com</a></li>
                            <li><a href=""></a></li>
                        </ul>
                    </div>
                </div>
                <footer className="flex justify-center items-center small-footer py-4 border-t-2 border-tertiary border-opacity-[0.02] mt-5 text-center">
                    <div className="w-[30px] h-[40px] mr-2">
                        <Image className="h-full w-full" imageName={'tmdb.png'} />
                    </div>
                    <h1>&copy; 2024 CouplesView</h1>
                </footer>
            </footer>
        </section>
    )
}

export default Footer;