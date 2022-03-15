import React, { Component } from "react";
import imageforpage from "./images/3627664.svg";
import Navbarr from "./Navbarr";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      regno: "",
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.redirector = this.redirector.bind(this);
    this.checkServerStatus = this.checkServerStatus.bind(this);
  }
  //on change handler
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // function to redirect another page
  redirector = () => {
    if (
      this.state.regno === "" ||
      this.state.regno === null ||
      this.state.regno === undefined ||
      this.state.regno === " " ||
      typeof this.state.regno === "NaN"
    ) {
      alert("Please enter your registration number");
    } else {
      this.props.history.push("/report/" + this.state.regno);
    }
  };

  //function to check server status
  checkServerStatus = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Server is running");
          this.setState({ isloading: false });
        } else {
          console.log("Server is not running");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isloading: true });
      });
  };
  componentDidMount() {
    this.checkServerStatus();
  }

  render() {
    return (
      <div>
        <Navbarr />

        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h1 className="h1 mt-3">Credit Manager 👨‍💼</h1>
                <h4 className="h5 text-muted">
                  Solution for Centurion Students.
                </h4>
                <p className="lead">
                  Credit Manager is a web application that helps Centurion
                  students to manage their credits.
                  <br />
                  <br />
                  <input
                    type="number"
                    className="form-control border-dark"
                    placeholder="Search 🔍 by Your Registered Number."
                    name="regno"
                    value={this.state.regno}
                    onChange={this.onChangeHandler}
                  />
                  <button
                    className="btn btn-dark mt-3"
                    onClick={this.redirector}
                  >
                    <i className="fas fa-search"></i> Search
                  </button>
                  <br />
                  <span className="text-muted">
                    <br />
                    <i className="fas fa-info-circle"></i> &nbsp; If you are not
                    registered, please register first. or Login.
                  </span>
                  <br />
                  {/* Check Server Status */}
                  <span className="text-muted">
                    Server Status...
                    {this.state.isloading ? (
                      <span>
                        <i className="fa fa-spinner fa-spin text-danger" />
                        Loading
                      </span>
                    ) : (
                      <i className="fa fa-check-circle text-success" />
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="col-sm-6">
              <img src={imageforpage} alt="logo" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
