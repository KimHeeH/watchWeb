import React from "react";
import { useMovieRecommendedQuery } from "../../../../hooks/useMovieRecommended";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MovieRecommend.style.css";
const MovieRecommended = ({ movie, id }) => {
  const { data, isLoading, error, isError } = useMovieRecommendedQuery(id);
  const navigate = useNavigate();
  console.log(data);
  const goMovieDetailPage = (movie) => {
    navigate(`/movies/${movie.id}`, movie);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <Row>
          {data?.map((movie) => (
            <Col lg={6} md={6} sm={12} key={movie.id} className="mb-4">
              <div
                className="recommendMovie"
                onClick={() => goMovieDetailPage(movie)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.backdrop_path}`}
                  alt={movie.title}
                  style={{ borderRadius: "5px" }} // Adjust the image style here
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MovieRecommended;
