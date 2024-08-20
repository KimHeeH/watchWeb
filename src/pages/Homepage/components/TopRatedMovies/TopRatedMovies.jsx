import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie";
const TopRatedMovies = () => {
  const { data, isError, error, isLoading } = useTopRatedMoviesQuery();
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Top Rated Movies"
        movies={data} // data만 전달
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovies;
