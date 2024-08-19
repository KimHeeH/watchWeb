import React from "react";
import Alert from "react-bootstrap/Alert";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("raw data:", data); // 전체 데이터를 확인하는 로그

  if (isLoading) {
    console.log("Loading state");
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    console.log("Error state:", error);
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // Axios의 응답 형태라면 `data.data.results`로 접근해야 함
  const moviesData = data?.data;
  if (!moviesData || !moviesData.results || moviesData.results.length === 0) {
    console.log("No data available");
    return <h1>No data available</h1>;
  }

  const posterPath = moviesData.results[0].poster_path;
  console.log("Poster Path:", posterPath);

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${posterPath})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{moviesData.results[0].title}</h1>
        <p>{moviesData.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
