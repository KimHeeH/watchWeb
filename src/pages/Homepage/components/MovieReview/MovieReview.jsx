import React from "react";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReview";
import { Container } from "react-bootstrap";
import ReviewCotant from "./ReviewCotant";
import { Alert } from "react-bootstrap";
const MovieReview = ({ id }) => {
  const { data, isLoading, error, isError } = useMovieReviewQuery(id);
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  console.log("movie review", data);
  return (
    <div>
      <Container>
        <h1>Reviews</h1>
        {data.map((review, index) => (
          <ReviewCotant author={review} key={index} />
        ))}
      </Container>
    </div>
  );
};

export default MovieReview;
