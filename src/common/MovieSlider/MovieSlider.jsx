import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive }) => {
  console.log(title, movies); // 여기서 movies 구조를 다시 확인하세요

  return (
    <div>
      <p className="slideBox">{title}</p>
      <Carousel
        centerMode={true}
        infinite={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container "
        responsive={responsive}
      >
        {movies?.data.results?.map(
          (
            movie,
            index // 여기서 results에 바로 접근
          ) => (
            <MovieCard movie={movie} key={index} />
          )
        )}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
