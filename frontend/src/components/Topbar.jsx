import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import { FaSearch } from "react-icons/fa";

function Topbar() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" sticky="top" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Blog brand logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Lifestyle
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Technology
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Fashion
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Sports
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Cinema
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/action1"}>
                  Music
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to={"/myposts"}>
                My Posts
              </Nav.Link>
              <Nav.Link as={Link} to={"/create"}>
                Create
              </Nav.Link>
              <Nav.Link as={Link} to={"/login"}>
                Logout
              </Nav.Link>
              <Nav.Link as={Link} to={"/dis"} disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <FaSearch />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}

export default Topbar;
