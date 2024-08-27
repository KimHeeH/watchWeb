import React, { useState } from "react";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./MovieDetailPage.style.css";
import MovieReview from "../Homepage/components/MovieReview/MovieReview";
import Button from "react-bootstrap/Button";
import MovieRecommended from "../Homepage/components/MovieRecommended/MovieRecommended";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetailQuery(id);
  const [activeTab, setActiveTab] = useState("review"); // 하나의 상태로 관리
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const { data: movieVideoData } = useMovieVideoQuery(id);
  let videoKey = movieVideoData?.[0]?.key;

  const trailer = movieVideoData?.find((video) => video.type === "Trailer");
  if (trailer) {
    videoKey = trailer.key; // Now you can reassign since it's declared with 'let'
  }

  console.log(movieVideoData);
  console.log(movieVideoData);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const opts = {
    height: "500",
    width: "1000",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const poster_path = data?.poster_path;
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
                  <Col lg={6}>
                    <div className="badge-container">
                      {BadgeList.map((menu, index) => (
                        <div className="badge-item" key={index}>
                          <Badge bg="danger">{menu}</Badge>
                          <div className="badge-value">
                            {BadgeDataList[index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>

                  {values.map((v, idx) => (
                    <Button
                      key={idx}
                      variant="outline-light"
                      className="me-2 mb-2 mt-5"
                      onClick={() => handleShow(v)}
                    >
                      예고편 보기
                      {typeof v === "string" && `below ${v.split("-")[0]}`}
                    </Button>
                  ))}
                  <Modal
                    show={show}
                    fullscreen={fullscreen}
                    onHide={() => setShow(false)}
                    className="modal-dark-background"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>예고편</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {videoKey ? (
                        <YouTube
                          videoId={videoKey}
                          id={""}
                          className={""}
                          title="예고편"
                        />
                      ) : (
                        <p>No video available</p>
                      )}
                    </Modal.Body>
                  </Modal>
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
