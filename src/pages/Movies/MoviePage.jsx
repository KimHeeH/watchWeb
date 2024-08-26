import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // 기본값은 내림차순
  const [sortedMovies, setSortedMovies] = useState([]);
  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, error, isError } = useSearchMovieQuery({
    keyword,
    page,
  });
  const genreIDList = genreData;
  console.log(genreIDList);

  useEffect(() => {
    if (data?.results) {
      const movies = [...data.results];
      movies.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.popularity - b.popularity; // 오름차순 정렬
        } else {
          return b.popularity - a.popularity; // 내림차순 정렬
        }
      });
      setSortedMovies(movies);
    }
  }, [data, sortOrder]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  console.log(data);
  const FilteredMovie = ({ list }) => {
    if (data?.results) {
      const movies = [...data.results];

      // genre_ids에 list.id가 포함된 모든 영화를 필터링
      const filteredMovies = movies.filter((movie) =>
        movie.genre_ids.includes(list.id)
      );

      // 필터링된 영화를 상태에 설정
      setSortedMovies(filteredMovies);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <DropdownButton
            id="dropdown-basic-button"
            className="sort-button"
            title="Sort"
            variant="secondary"
          >
            <Dropdown.Item v onClick={() => handleSortChange("desc")}>
              Popularity (High to Low)
            </Dropdown.Item>
            <Dropdown.Item
              variant="secondary"
              onClick={() => handleSortChange("asc")}
            >
              Popularity (Low to High)
            </Dropdown.Item>
          </DropdownButton>
          <div className="badge-container">Genres</div>
          <div>
            {genreIDList.map((list, index) => (
              <Badge
                key={index}
                className="badges"
                onClick={() => FilteredMovie({ list })}
              >
                {list.name}
              </Badge>
            ))}
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {sortedMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
