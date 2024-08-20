import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useUpcomingMoviesQuery } from "../../../../hooks/UpcomingMovies";
const UpcomingMovieSlider = () => {
  const { data, isLoading, error, isError } = useUpcomingMoviesQuery();
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Upcoming Movies"
        movies={data}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlider;
