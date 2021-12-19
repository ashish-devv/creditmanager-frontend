import React, { Component } from "react";
import { Link } from "react-router-dom";
import imageforpage from "./images/Mobile login.svg";
import Navbarr from "./Navbarr";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      isLoading: false,
      error: null,
    };
    //bind the function to the class
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
      //redirect to home page
      this.props.history.push("/home");
    }
  }
  //function to handle login
  handleLogin = () => {
    //validate inputs
    if (this.state.email === "" || this.state.password === "") {
      alert("Please fill all the fields");
    } else {
      this.setState({
        isLoading: true,
      });
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success === 1) {
            //save token in local storage
            localStorage.setItem("token", res.token);
            localStorage.setItem("isLoggedIn", "true");
            this.setState({
              isLoggedIn: true,
            });
            //redirect to home page
            this.props.history.push("/home");
          } else {
            this.setState({
              error: res.status,
            });
          }
          this.setState({
            isLoading: false,
          });
        })
        .catch((err) => {
          this.setState({
            error: "Something went wrong ! Please try again 😅",
          });
          this.setState({
            isLoading: false,
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
                      <h1 className="card-title text-center">Login</h1>
                      <p className="card-text">
                        <input
                          type="email"
                          className="form-control border-dark"
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
                          onClick={this.handleLogin}
                        >
                          <i className="fas fa-sign-in-alt"></i> Login
                        </button>
                        &nbsp;
                        <button className="btn btn-danger mt-3">
                          <i className="fas fa-user-plus"></i> Reset
                        </button>
                        <br />
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
                          are not registered, please{" "}
                          <Link to="/register"> register</Link>
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
