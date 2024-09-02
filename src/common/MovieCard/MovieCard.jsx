import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const posterPath = movie?.poster_path;
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  const goMovieDetailPage = (movie) => {
    navigate(`/movies/${movie.id}`, movie);
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}` +
          ")",
      }}
      className="movie-card"
      onClick={() => goMovieDetailPage(movie)} // 함수 호출이 아닌 함수 전달로 변경
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <div className="genre-container">
          {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge key={index} bg="danger" className="genre-badge">
              {genre}
            </Badge>
          ))}
        </div>
        <div>
          <div style={{ margin: "10px" }}>{movie.vote_average}</div>
          <div style={{ margin: "10px" }}>{movie.popularity}</div>
          <div style={{ margin: "10px" }}>
            {movie.adult ? "over18" : "under18"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
