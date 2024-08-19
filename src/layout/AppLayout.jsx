import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="container">
      <Navbar style={{ backgroundColor: "black ! important" }}>
        <Container fluid>
          <Navbar.Brand href="#">
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
              <Nav.Link style={{ color: "white" }} href="#action1">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "white" }} href="#action2">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                variant="dark"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
