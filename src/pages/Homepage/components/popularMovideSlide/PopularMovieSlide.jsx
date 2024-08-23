import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
const PopularMovieSlide = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();
  console.log("ddd", data);
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // movies prop에 data 전체를 전달
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data} // data만 전달
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
