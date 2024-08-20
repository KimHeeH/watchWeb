import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
//경로2가지
//nav바에서 클릭해서 온 경우 =popularMovie 보여주기
//keyword를 입력해서 온 경우=>keyword와 관련된 영화를 보여줌
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, error, isError } = useSearchMovieQuery({ keyword });
  console.log("ddd", data);
  if (isLoading) {
    console.log("Loading state");
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    console.log("Error state:", error);
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return <div>MoviePage</div>;
};

export default MoviePage;
