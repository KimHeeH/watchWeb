import React from "react";
import "./Homepage.style.css";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/TopRatedMovies/TopRatedMovies";
import UpcomingMovieSlider from "./components/UpcomingMovieSlider/UpcomingMovieSlider";
import TopRatedMovies from "./components/TopRatedMovies/TopRatedMovies";
//1.배너=>popular 영화를 들고와서 첫번째 아이템을 보여주자.
//2.popular movie
//3.top rated movie
//4.upcoming movie
const Homepage = () => {
  return (
    <div className="container">
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovies />
      <UpcomingMovieSlider />
    </div>
  );
};

export default Homepage;
