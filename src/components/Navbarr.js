import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";

import { Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

export default class Navbarr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };

    //bind the function to the class
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.setState({
        isLoggedIn: true,
      });
    }
  }
  logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("isLoggedIn", "false");
    this.setState({
      isLoggedIn: false,
    });
    //redirect to home Route

    window.location.href = "/";
  };
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          &nbsp;
          <i className="fas fa-poll fa-2x"></i> Credit Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* show logout only when isloggedIn is true */}
            {this.state.isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/home">
                  Home <i className="fas fa-chart-line"></i>
                </Nav.Link>
                <Nav.Link as={Link} to="/setting">
                  Setting <i class="fas fa-cogs"></i>
                </Nav.Link>
                <Nav.Link onClick={this.logout}>
                  logout <i className="fas fa-sign-out-alt"></i>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login <i className="fas fa-sign-in-alt"></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
