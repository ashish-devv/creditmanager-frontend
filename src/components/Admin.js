import React, { Component } from "react";
import Navbarr from "./Navbarr";
import { Link } from "react-router-dom";
import { ExportToExcel } from "./ExportToExcel";
import Modal from "react-bootstrap/Modal";
import { ModalMessage } from "./ModalMessage";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      isLoggedIn: false,
      user: [],
      isAdmin: false,
      isUser: false,
      isSuperAdmin: false,
      isLoading: false,
      isError: false,
      errorMessage: "",
      isSuccess: false,
      subjectcode: "",
      year: "",
      showyeardata: true,
      yearofdata: "",
      userdetails: [],
      userdetailsinsubjects: [],
      yearwisedatatable: [],
    };
    this.search = this.search.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.readJwt = this.readJwt.bind(this);
    this.getdetailyearwise = this.getdetailyearwise.bind(this);
    this.makelistforyeardata = this.makelistforyeardata.bind(this);
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  readJwt = () => {
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const data = JSON.parse(jsonPayload);
    this.setState({
      isAdmin: data.admin,
    });
    if (data.admin !== true) {
      // redirect to home page
      this.props.history.push("/login");
    }
    console.log(data);
  };

  search = () => {
    this.setState({
      isLoading: true,
    });
    fetch(process.env.REACT_APP_BACKEND_URL + "/getdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        subjectcode: this.state.subjectcode,
        year: this.state.year,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoading: false,
        });
        if (res.code === 0) {
          // alert(res.status);
          this.setState({
            errorMessage: res.status,
            modalShow: true,
          });
          this.setState({
            user: [],
          });
        } else {
          console.log(res);
          this.setState({
            isLoading: false,
            user: res.userlist,
          });
        }
      });
  };

  getdetailyearwise() {
    this.setState({
      isLoading: true,
    });
    fetch(process.env.REACT_APP_BACKEND_URL + "/getdetailyearwise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        year: this.state.yearofdata,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoading: false,
        });
        if (res.code === 0) {
          // alert(res.status);
          this.setState({
            errorMessage: res.status,
            modalShow: true,
          });
          this.setState({
            user: [],
          });
        } else {
          console.log(res);
          this.setState({
            isLoading: false,
            userdetails: res.userlist,
            userdetailsinsubjects: res.allsubjecttakenbyuser,
          });
          this.makelistforyeardata(
            this.state.userdetails,
            this.state.userdetailsinsubjects
          );
        }
      });
  }

  makelistforyeardata(userdetails, userdetailsinsubjects) {
    var list = [];

    for (var i in userdetails) {
      var obj = {};
      var subjectlist = [];
      console.log(userdetails[i]._id);
      obj["name"] = userdetails[i].name;
      obj["_id"] = userdetails[i]._id;
      obj["regno"] = userdetails[i].regno;

      var b1 = 0;
      var b2 = 0;
      var b3 = 0;
      var b4 = 0;
      var b5 = 0;
      for (var j in userdetailsinsubjects) {
        if (userdetailsinsubjects[j].uid === userdetails[i]._id) {
          if (userdetailsinsubjects[j].basketno === 1) {
            b1 = b1 + userdetailsinsubjects[j].subjectcredit;
          }
          if (userdetailsinsubjects[j].basketno === 2) {
            b2 = b2 + userdetailsinsubjects[j].subjectcredit;
          }
          if (userdetailsinsubjects[j].basketno === 3) {
            b3 = b3 + userdetailsinsubjects[j].subjectcredit;
          }
          if (userdetailsinsubjects[j].basketno === 4) {
            b4 = b4 + userdetailsinsubjects[j].subjectcredit;
          }
          if (userdetailsinsubjects[j].basketno === 5) {
            b5 = b5 + userdetailsinsubjects[j].subjectcredit;
          }
          subjectlist.push(userdetailsinsubjects[j]);
        }
      }
      obj["b1"] = b1;
      obj["b2"] = b2;
      obj["b3"] = b3;
      obj["b4"] = b4;
      obj["b5"] = b5;
      obj["totalcredit"] = b1 + b2 + b3 + b4 + b5;
      obj["subjects"] = subjectlist;
      list.push(obj);
    }
    this.setState({
      yearwisedatatable: list,
    });
    console.log(list);
  }

  componentDidMount() {
    this.readJwt();
  }

  //download as excel file

  render() {
    return (
      <div>
        <Navbarr />
        <div className="container-fluid mt-2">
          <ModalMessage
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            message={this.state.errorMessage}
          />
          <h1 className="h1">
            Admin DashBoard <i class="fa-solid fa-bars-progress"></i>
          </h1>
          <div className="">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={() =>
                  this.setState({ showyeardata: !this.state.showyeardata })
                }
                value={this.state.showyeardata}
              />
              <label className="form-check-label" for="flexSwitchCheckDefault">
                Show Data According to Subjects
              </label>
            </div>
          </div>
          {!this.state.showyeardata ? (
            <div className="row">
              <div className="col-sm-3">
                {/* Search Students */}
                <div className="card bg-dark text-white border-primary">
                  <div className="card-body">
                    <h4 className="card-title">Search 🔎</h4>
                    <p className="card-text mt-2">
                      <label htmlFor="subjectcode">Subject Code:</label>
                      <input
                        type="text"
                        name="subjectcode"
                        id="subjectcode"
                        className="form-control border-dark"
                        onChange={this.onChangeHandler}
                      />
                      {/* <label htmlFor="subjectcode">Semester :</label>
                    <input
                      type="text"
                      name="semester"
                      id="semester"
                      className="form-control border-dark"
                      onChange={this.onChangeHandler}
                    /> */}
                      {/* <select
                      name="semester"
                      id="semester"
                      className="form-select border-dark"
                    >
                      <option value="1">All</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                      <option value="">5</option>
                      <option value="">6</option>
                      <option value="">7</option>
                      <option value="">8</option>
                    </select> */}
                      <label htmlFor="year">Year:</label>
                      <input
                        type="number"
                        name="year"
                        id="year"
                        className="form-control border-dark"
                        onChange={this.onChangeHandler}
                      />
                      {/* <select
                      name="year"
                      id="year"
                      className="form-select border-dark"
                    >
                      <option value="1">All</option>
                      <option value="">1st</option>
                      <option value="">2nd</option>
                      <option value="">3rd</option>
                      <option value="">4th</option>
                    </select> */}
                      <br />
                      <button
                        className="btn btn-primary border-dark"
                        onClick={this.search}
                      >
                        Search. 🔎
                      </button>
                    </p>
                  </div>
                </div>
                <div className="card bg-dark text-white border-primary">
                  <div className="card-body">
                    <h4 className="card-title">SideLoad Student Data:</h4>
                    <p className="card-text">
                      {/* file input bootstrap */}
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                        />
                        <button className="btn btn-danger mt-3">
                          Verify and Upload <i class="fa-solid fa-upload"></i>
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-9">
                {/* table for Student Detail */}
                {this.state.user.length === 0 ? (
                  ""
                ) : (
                  <ExportToExcel
                    apiData={this.state.user}
                    fileName={this.state.subjectcode + "_" + this.state.year}
                  />
                )}

                <div className="row mt-2">
                  <div className="col-sm-6">
                    <h4 className="h4">
                      Subject Code: {this.state.subjectcode}
                    </h4>
                  </div>
                  <div className="col-sm-6">
                    <h4 className="h4">Year : {this.state.year}</h4>
                  </div>
                </div>
                {this.state.isLoading ? (
                  <div
                    className="spinner-border text-primary mt-5 text-center"
                    role="status"
                  ></div>
                ) : (
                  <div className="table-responsive">
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">Registration No</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* check user is empty or not  */}

                        {this.state.user.length === 0 ? (
                          <tr>
                            <td colSpan={2} className="text-center text-danger">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          this.state.user.map((user) => (
                            <tr>
                              <td>
                                <Link to={`/report/${user.regno}`}>
                                  {user.name}
                                </Link>
                              </td>
                              <td>{user.regno}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="h4">Get Data Year Wise</h4>
              <div className="row">
                <div className="col-sm-3">
                  <div className="card bg-dark text-white">
                    <div className="card-body">
                      <h4 className="card-title">Search 🔎</h4>
                      <p className="card-text mt-2">
                        <input
                          type="text"
                          className="form-control border-dark"
                          placeholder="Enter your Year"
                          value={this.state.yearofdata}
                          name="yearofdata"
                          onChange={this.onChangeHandler}
                        />
                        <button
                          className="btn btn-success mt-2"
                          onClick={this.getdetailyearwise}
                        >
                          Search. 🔎
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  {this.state.userdetails.length === 0 ? (
                    ""
                  ) : (
                    <ExportToExcel
                      apiData={this.state.yearwisedatatable}
                      fileName={this.state.yearofdata + "_data"}
                    />
                  )}
                  <div className="table-responsive-sm">
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">basket 1</th>
                          <th scope="col">basket 2</th>
                          <th scope="col">basket 3</th>
                          <th scope="col">basket 4</th>
                          <th scope="col">basket 5</th>
                          <th scope="col" className="bg-success text-white">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* check user is empty or not  */}

                        {this.state.userdetails.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center text-danger">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          this.state.yearwisedatatable.map((user) => (
                            <tr>
                              <td>
                                <Link to={`/report/${user.regno}`}>
                                  {user.name}
                                </Link>
                              </td>
                              <td>{user.b1}</td>
                              <td>{user.b2}</td>
                              <td>{user.b3}</td>
                              <td>{user.b4}</td>
                              <td>{user.b5}</td>
                              <td>
                                {user.b1 +
                                  user.b2 +
                                  user.b3 +
                                  user.b4 +
                                  user.b5}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
