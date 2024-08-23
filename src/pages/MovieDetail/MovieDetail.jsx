import React, { useState } from "react";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./MovieDetailPage.style.css";
import MovieReview from "../Homepage/components/MovieReview/MovieReview";
import Button from "react-bootstrap/Button";
import MovieRecommended from "../Homepage/components/MovieRecommended/MovieRecommended";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetailQuery(id);
  const [activeTab, setActiveTab] = useState(null); // 하나의 상태로 관리

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const poster_path = data?.backdrop_path;
  const genreIDList = data?.genres || [];
  const genreList = genreIDList.map((genre) => genre.name);
  const BadgeList = ["Budget", "Popularity", "Release Day", "Time", "Revenue"];
  const BadgeDataList = [
    "$ " + data?.budget.toLocaleString(),
    data?.popularity,
    data?.release_date,
    data?.runtime + " 분",
    "$ " + data?.revenue.toLocaleString(),
  ];

  return (
    <div>
      <Container className="container">
        <Row>
          <Col lg={6} height="500px">
            <div className="poster">
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
                alt={data.title}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <div>
                {genreList.map((genre) => (
                  <Badge key={genre} bg="danger" style={{ margin: "5px" }}>
                    {genre}
                  </Badge>
                ))}
              </div>
              <h1>{data?.title}</h1>
              <div style={{ color: "red" }}>
                {data?.adult ? "Over 18" : "Under 18"}
              </div>
              <div className="overview">{data?.overview}</div>
              <Container>
                <Row>
                  <Col lg={4}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {BadgeList.map((menu, index) => (
                        <Badge
                          key={index}
                          bg="danger"
                          style={{
                            margin: "7px",
                            width: "80%",
                          }}
                        >
                          {menu}
                        </Badge>
                      ))}
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {BadgeDataList.map((menu, index) => (
                        <div key={index} style={{ margin: "5px" }}>
                          {menu}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
        <div className="button-container">
          <Button
            variant="outline-light"
            style={{ marginRight: "10px", width: "150px" }}
            onClick={() => toggleTab("review")}
          >
            Reviews
          </Button>
          <Button
            variant="outline-danger"
            style={{ width: "150px" }}
            onClick={() => toggleTab("recommended")}
          >
            Recommended
          </Button>
        </div>
        <div>
          {activeTab === "review" && <MovieReview id={id} />}
          {activeTab === "recommended" && (
            <MovieRecommended movie={data} id={id} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default MovieDetail;
