import React, { Component } from "react";
import { Link } from "react-router-dom";
import imageforpage from "./images/register.svg";
import Navbarr from "./Navbarr";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      regno: "",
      email: "",
      password: "",
      isLoggedIn: false,
      isLoading: false,
      error: null,
      done: false,
    };
    //bind the function to the class
    this.handleChange = this.handleChange.bind(this);
    this.handelRegister = this.handelRegister.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.setState({
        isLoggedIn: true,
      });
    }
  }
  //function to handle login
  handelRegister = () => {
    //validate the form
    if (
      this.state.name === "" ||
      this.state.regno === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      alert("Please fill all the fields");
    } else {
      this.setState({
        isLoading: true,
      });
      fetch(process.env.REACT_APP_BACKEND_URL + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          regno: this.state.regno,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          if (response.status === "success") {
            this.setState({
              isLoading: false,
              error: null,
              done: true,
              email: "",
              password: "",
              name: "",
              regno: "",
            });
          } else {
            this.setState({
              error: response.message,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            error: error.message,
          });
        });
    }
  };

  render() {
    return (
      //make login page component using bootstrap
      <div>
        <Navbarr />

        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="row">
                <div className="col-sm-6 align-self-center mt-4">
                  <div className="card border-dark cardshadow">
                    <div className="card-body">
                      <h1 className="card-title text-center">Signup</h1>
                      <p className="card-text">
                        <input
                          type="text"
                          className="form-control border-dark"
                          placeholder="Enter Name "
                          value={this.state.name}
                          onChange={this.handleChange}
                          name="name"
                          required
                        />
                        <input
                          type="number"
                          className="form-control border-dark mt-3"
                          placeholder="Enter Registration Number "
                          value={this.state.regno}
                          onChange={this.handleChange}
                          name="regno"
                          required
                        />
                        <input
                          type="email"
                          className="form-control border-dark mt-3"
                          placeholder="Enter Email "
                          value={this.state.email}
                          onChange={this.handleChange}
                          name="email"
                          required
                        />
                        <input
                          type="password"
                          className="form-control border-dark mt-3"
                          placeholder="Enter Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          name="password"
                          required
                        />
                        <button
                          className="btn btn-success mt-3"
                          onClick={this.handelRegister}
                        >
                          <i className="fas fa-sign-in-alt"></i> Register
                        </button>
                        &nbsp;
                        <button className="btn btn-danger mt-3">
                          <i className="fas fa-user-plus"></i> Reset
                        </button>
                        <br />
                        {/* show success message */}
                        {this.state.done ? (
                          <div
                            className="alert alert-success mt-3"
                            role="alert"
                          >
                            <h4 className="alert-heading">Success!</h4>
                            <p>You have successfully registered.</p>
                            <hr />
                            <p className="mb-0">
                              <Link to="/login">
                                <button className="btn btn-success">
                                  Login
                                </button>
                              </Link>
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* show error message */}
                        {this.state.error ? (
                          <div className="alert alert-danger mt-3">
                            {this.state.error}
                          </div>
                        ) : (
                          ""
                        )}
                        {/* show loading message */}
                        {this.state.isLoading ? (
                          <div className="alert alert-info mt-3">
                            <i className="fas fa-spinner fa-spin"></i>
                            &nbsp; Loading...
                          </div>
                        ) : (
                          ""
                        )}
                        <span className="text-muted">
                          <br />
                          <i className="fas fa-info-circle"></i> &nbsp; If you
                          are already a member, please{" "}
                          <Link to="/login"> Login</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <img src={imageforpage} alt="logo" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
