import HeroSection from "../components/Movies/HeroSection";
import Trending from "../components/Movies/Trending";
import PopularMovies from "../components/Movies/PopularMovies";
import TopRatedMovies from "../components/Movies/TopRatedMovies";

function Movies () {
    return (
        <>
          <HeroSection />
          <Trending />
          <PopularMovies />
          <TopRatedMovies />
        </>
    )
}

export default Movies