import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Image } from '../../../public/assets/exportImage';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid';

function Header() {
    const [display, setDisplay] = useState("hidden");

    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        const ham = document.querySelector(".ham");

        const windowSetHamStateOnClick = (e) => {
            if (e.target !== ham && !ham.contains(e.target)) {
                setDisplay("hidden");
            }
        }

        window.addEventListener("click", windowSetHamStateOnClick);

        return () => {
            window.removeEventListener("click", windowSetHamStateOnClick);
        }
    }, []);

    useEffect(() => {
        const ham = document.querySelector(".ham");
        const hamLines = Array.from(ham.querySelectorAll(".hamline"));

        function SetHamState() {
            hamLines.forEach((line) => {
                if (display == "hidden") {
                    line.classList.add("bg-tertiary");
                    line.classList.remove("bg-cta");
                } else {
                    line.classList.remove("bg-tertiary");
                    line.classList.add("bg-cta");
                }
            });
        }
        SetHamState();

    }, [display]);

    useEffect(() => {
        function closeSearchBarOnClick(e) {
            const magnifyingGlassIconContainer = document.querySelector(".magnifyingGlassIcon-container");
            const magnifyingGlass = document.querySelector(".magnifyingGlassPrev");
            const searchBar = document.querySelector(".searchBar");

            if ((searchBar && searchBar !== e.target && !searchBar.classList.contains("hidden")) && 
            (magnifyingGlass && magnifyingGlass !== e.target) && 
            (magnifyingGlassIconContainer && !magnifyingGlassIconContainer.contains(e.target))) {
                magnifyingGlassIconContainer.classList.remove('bg-tertiary', 'bg-opacity-90', 'sm:bg-none', 'p-[2px]', 'sm:p-0');
                searchBar.classList.add("hidden");
            }
        }

        function closeSearchBarOnResize() {
            const magnifyingGlassIconContainer = document.querySelector(".magnifyingGlassIcon-container");
            const searchBar = document.querySelector(".searchBar");

            if (searchBar && !searchBar.classList.contains("hidden")) {
                magnifyingGlassIconContainer.classList.remove('bg-tertiary', 'bg-opacity-90', 'sm:bg-none', 'p-[2px]', 'sm:p-0');
                searchBar.classList.add("hidden");
            }
        }

        window.addEventListener("click", closeSearchBarOnClick);
        window.addEventListener("resize", closeSearchBarOnResize);

        return () => {
            window.removeEventListener("click", closeSearchBarOnClick);
            window.removeEventListener("resize", closeSearchBarOnResize);
        }
    }, []);

    const toggleDisplay = (e) => {
        const hamLines = Array.from(e.target.querySelectorAll(".hamline"));
        const hamOptions = document.querySelector(".ham-ul-options");

        hamLines.forEach((line) => {
            if (display == "hidden") {
                line.classList.add("bg-tertiary");
                line.classList.remove("bg-cta");
            } else {
                line.classList.remove("bg-tertiary");
                line.classList.add("bg-cta");
            }
        });

        if (hamOptions.classList.contains("hidden")) {
            setDisplay("block");
        } else {
            setDisplay("hidden");
        }
    }

    const searchDisplay = () => {
        const magnifyingGlassIconContainer = document.querySelector(".magnifyingGlassIcon-container");
        const searchBar = document.querySelector(".searchBar");

        if (magnifyingGlassIconContainer && (searchBar && searchBar.classList.contains("hidden")) && window.innerWidth <= 639) {
            magnifyingGlassIconContainer.classList.add('bg-tertiary', 'bg-opacity-90', 'sm:bg-none', 'p-[2px]', 'sm:p-0');
            searchBar.classList.remove("hidden");
        }
    }

    return (
        <section className="sticky inset-0 z-50 bg-primary flex justify-center w-full px-2 bg-opacity-[.95]">
            <header className="container flex items-center justify-between pt-2 pb-2">
                <div className="flex items-center">
                    <a href="/" className="block mr-2 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full">
                        <Image imageName="logo.png" className="h-full w-full rounded-full" />
                    </a>
                    <div onClick={(e) => { toggleDisplay(e) }} className="relative cursor-pointer ham flex flex-col justify-between h-[20px] w-[30px] sm:h-[25px] sm:w-[35px] lg:h-[30px] md:w-[40px]">
                        <div className="w-[92%] b hamline hamline1"></div>
                        <div className="self-end w-[80%] hamline hamline2"></div>
                        <div className="w-[92%] hamline hamline3"></div>
                        <nav className={`${display} absolute ham-ul-options items-center top-[40px] sm:top-[47px] lg:top-[54px] 2xl:top-[59px] bg-secondary rounded-lg`}>
                            <ul className="w-[200px] sm:w-[250px] 2xl:w-[300px] text-cta list-none no-underline text-center sm:text-lg 2xl:text-xl">
                                <li><a href="/" className={`${pathname == "/" ? "bg-cta text-tertiary" : ""}`}>Get started</a></li>
                                <li><a href="/movies" className={`${pathname == "/movies" ? "bg-cta text-tertiary" : ""}`}>Movies</a></li>
                                <li><a className={`${pathname == "/genres" ? "bg-cta text-tertiary" : ""}`}>Genres</a></li>
                                <li><a className={`${pathname == "/contact" ? "bg-cta text-tertiary" : ""}`}>Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center justify-end ml-3 w-full sm:w-[50%]">
                    {pathname !== "/" && (
                        <div className="searchBar-container flex justify-end no-wrap w-full h-[27px] sm:h-[30px] md:h-[32px] xl:h-[36px] 2xl:h-[38px]">
                            <input type="text" className="hidden sm:block searchBar border-opacity-80 sm:focus:border-l-2 sm:focus:border-t-2 sm:focus:border-b-2 focus:border-secondary bg-tertiary bg-opacity-85 px-2 sm:px-1 text-sm md:text-md lg:text-lg w-full h-full outline-none" />
                            <div onClick={() => searchDisplay()} className="magnifyingGlassIcon-container">
                                <MagnifyingGlassIcon className="magnifyingGlassPrev sm:magnifyingGlass hover:bg-opacity-85 transition-opacity cursor-pointer p-1 h-full  sm:w-[30px] lg:w-[40px] 2xl:w-[45px] bg-secondary text-cta rounded-full sm:rounded-none" />
                            </div>
                        </div>
                    )}
                    <div className="sm:hidden ml-2">
                        <UserIcon className="text-tertiary w-[28px]" />
                    </div>
                </div>
                <div className="hidden sm:flex items-center space-x-3 md:text-lg 2xl:text-xl font-medium">
                    <button className="text-tertiary">Log In</button>
                    <button className="text-tertiary rounded-md py-1 px-3 bg-cta transition-colors duration-200 ease-in hover:bg-cta_hover">SignUp</button>
                </div>
            </header>
        </section>
    )
}

export default Header