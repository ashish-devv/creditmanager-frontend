import React, { Component } from "react";
import Navbarr from "./Navbarr";
import picturesettings from "./images/20943584 [Converted].svg";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.setState({
        isLoggedIn: true,
      });
    } else {
      // redirect to home route
      window.location.href = "/";
    }
  }
  // handel change
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  //fetches data from the server

  render() {
    return (
      <div>
        <Navbarr />
        <div className="row">
          <div className="col-sm-8">
            <h2 className="h2 m-2">Settings</h2>
            <div>
              <input
                className="form-control m-2"
                type="text"
                name="username"
                placeholder="username"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <img src={picturesettings} alt="settings" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }
}
