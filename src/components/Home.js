import React, { Component } from "react";
import imageforpage from "./images/3627664.svg";
import Navbarr from "./Navbarr";

export default class Home extends Component {
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
                    type="text"
                    className="form-control border-dark"
                    placeholder="Search 🔍 by Your Registered Number."
                  />
                  <button className="btn btn-dark mt-3">
                    <i className="fas fa-search"></i> Search
                  </button>
                  <br />
                  <span className="text-muted">
                    <br />
                    <i className="fas fa-info-circle"></i> &nbsp; If you are not
                    registered, please register first. or Login.
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
