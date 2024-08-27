import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AppLauout.style.css";
const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  const goHomepage = () => {
    navigate("/");
  };
  const goMoviePage = () => {
    navigate("/movies");
  };
  return (
    <div className="container">
      <Navbar style={{ backgroundColor: "black ! important" }}>
        <Container fluid>
          <Navbar.Brand href="#" onClick={goHomepage}>
            <img
              src="https://loodibee.com/wp-content/uploads/Netflix-logo.png"
              width="100"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                style={{ color: "white" }}
                href="#action1"
                onClick={goHomepage}
              >
                Home
              </Nav.Link>
              <Nav.Link
                style={{ color: "white" }}
                href="#action2"
                onClick={goMoviePage}
              >
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                variant="dark"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
