import React, { Component } from "react";
import Navbarr from "./Navbarr";
import picturesettings from "./images/20943584 [Converted].svg";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      isLoggedIn: false,
      uid: "",
      email: "",
      regno: "",
      name: "",
      basket1: "",
      basket2: "",
      basket3: "",
      basket4: "",
      basket5: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchuserdetails = this.fetchuserdetails.bind(this);
    this.updateCredit = this.updateCredit.bind(this);
  }
  componentDidMount() {
    this.fetchuserdetails();
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.setState({
        isLoggedIn: true,
      });
    } else {
      // redirect to home route
      window.location.href = "/";
    }
  }
  //fetch user details
  fetchuserdetails = () => {
    this.setState({
      isloading: true,
    });
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/updatebasketcredit", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isloading: false,
        });
        console.log(data);
        if (data.code === 0) {
          this.setState({
            basket1: data.user.basket1,
            basket2: data.user.basket2,
            basket3: data.user.basket3,
            basket4: data.user.basket4,
            basket5: data.user.basket5,
          });
        }
      });
  };
  // handel change
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //update basket credit
  updateCredit = () => {
    this.setState({
      isloading: true,
    });
    const token = localStorage.getItem("token");
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/updatebasketcredit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        basket1: this.state.basket1,
        basket2: this.state.basket2,
        basket3: this.state.basket3,
        basket4: this.state.basket4,
        basket5: this.state.basket5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isloading: false,
        });

        console.log(data);
        if (data.code === 0) {
          this.fetchuserdetails();
        } else {
          alert("Error updating basket credit");
        }
      });
  };

  render() {
    return (
      <div>
        <Navbarr />
        <div className="row">
          <div className="col-sm-8">
            <h2 className="h2 m-2">Settings ⚙ </h2>
            {this.state.isloading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="card border-dark">
                  <div className="card-body">
                    <h5 className="card-title">
                      Credit required{" "}
                      <span className="text-muted">
                        (Change According To Your Credit Need)
                      </span>{" "}
                    </h5>
                    <p className="card-text">
                      <div className="row">
                        <div className="col-auto">
                          <label className="col-form-label">Basket 1</label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control border-success"
                            name="basket1"
                            value={this.state.basket1}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-auto">
                          <label className="col-form-label">Basket 2</label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control border-success"
                            name="basket2"
                            value={this.state.basket2}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      {/*  */}
                      <div className="row mt-1">
                        <div className="col-auto">
                          <label className="col-form-label">Basket 3</label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control border-success"
                            name="basket3"
                            value={this.state.basket3}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-auto">
                          <label className="col-form-label">Basket 4</label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control border-success"
                            name="basket4"
                            value={this.state.basket4}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-auto">
                          <label className="col-form-label">Basket 5</label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control border-success"
                            name="basket5"
                            value={this.state.basket5}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-success mt-2"
                        onClick={this.updateCredit}
                      >
                        Update credit
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-4">
            <img src={picturesettings} alt="settings" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }
}
