import React, { Component } from "react";
import Navbarr from "./Navbarr";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imageforpage from "./images/3324675.svg";
import Subjectcard from "./images/Subjectcard";

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      regno: "",
      name: "",
      data: [],
      subjectname: "",
      subjectcode: "",
      subjectcredit: "",
      semester: 1,
      basketno: 1,
    };
    this.readJwt = this.readJwt.bind(this);
  }
  componentDidMount() {
    this.readJwt();
    this.getDataApi();
  }
  handelChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  //function to hit the api
  getDataApi = () => {
    fetch("http://localhost:5000/api/getsubjectlist", {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          this.setState({
            data: res.subjectlist,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //add subject function
  addData = () => {
    fetch("http://localhost:5000/api/addsubject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        subjectname: this.state.subjectname,
        subjectcode: this.state.subjectcode,
        subjectcredit: this.state.subjectcredit,
        semester: this.state.semester,
        basketno: this.state.basketno,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "success") {
          this.setState({
            subjectname: "",
            subjectcode: "",
            subjectcredit: "",
          });
          this.getDataApi();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //function to handel read from jwt token and store in state
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
      uid: data.uid,
      email: data.email,
      regno: data.regno,
      name: data.name,
    });
    console.log(data);
  };

  render() {
    return (
      <div>
        <Navbarr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-9">
              <h3 className="h3">Hey {this.state.name},</h3>
              <hr />
              <h6 className="h6">Add Subjects</h6>
              <div className="row g-5 ">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control border-dark"
                    placeholder="Enter Subject Name"
                    name="subjectname"
                    onChange={this.handelChange}
                    value={this.state.subjectname}
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control border-dark"
                    placeholder="Enter Subject Code"
                    name="subjectcode"
                    onChange={this.handelChange}
                    value={this.state.subjectcode}
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    className="form-control border-dark"
                    placeholder="Enter Subject Credit"
                    name="subjectcredit"
                    onChange={this.handelChange}
                    value={this.state.subjectcredit}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="form-control border-dark"
                    name="basketno"
                    onChange={this.handelChange}
                    value={this.state.value}
                  >
                    <option value="1">Basket 1</option>
                    <option value="2">Basket 2</option>
                    <option value="3">Basket 3</option>
                    <option value="4">Basket 4</option>
                    <option value="5">Basket 5</option>
                  </select>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-primary border-dark"
                    onClick={this.addData}
                  >
                    Add Subject
                  </button>
                </div>
              </div>
              {/* make a button to add subject icon */}

              <hr />
              <select
                name="semester"
                className="form-control text-center border-dark"
                onChange={this.handelChange}
                value={this.state.value}
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
              <div class="table-responsive">
                <table className="table table-striped table-primary mt-1 text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>

                      <th scope="col">Basket 1</th>
                      <th scope="col">Basket 2</th>
                      <th scope="col">Basket 3</th>
                      <th scope="col">Basket 4</th>
                      <th scope="col">Basket 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Completed</th>
                      {/* Sum all basket 1 credits */}
                      <td>
                        {this.state.data
                          .filter((item) => item.basketno === 1)
                          .map((item) => item.subjectcredit)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                      {/* Sum all basket 2 credits */}
                      <td>
                        {this.state.data
                          .filter((item) => item.basketno === 2)
                          .map((item) => item.subjectcredit)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                      {/* Sum all basket 3 credits */}
                      <td>
                        {this.state.data
                          .filter((item) => item.basketno === 3)
                          .map((item) => item.subjectcredit)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                      {/* Sum all basket 4 credits */}
                      <td>
                        {this.state.data

                          .filter((item) => item.basketno === 4)
                          .map((item) => item.subjectcredit)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                      {/* Sum all basket 5 credits */}
                      <td>
                        {this.state.data

                          .filter((item) => item.basketno === 5)
                          .map((item) => item.subjectcredit)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">To be Completed</th>
                      <td>18</td>
                      <td>18</td>
                      <td>27</td>
                      <td>45</td>
                      <td>52</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-4">
                <div className="col-sm">
                  <h6>Basket 1</h6>
                  {/* print all subject with from basket 1 */}
                  {this.state.data.map((item) => {
                    if (
                      item.basketno == 1 &&
                      item.semester == this.state.semester
                    ) {
                      return <Subjectcard data={item} key={item._id} />;
                    }
                  })}
                </div>
                <div className="col-sm">
                  <h6>Basket 2</h6>
                  {this.state.data.map((item) => {
                    if (
                      item.basketno == 2 &&
                      item.semester == this.state.semester
                    ) {
                      return <Subjectcard data={item} key={item._id} />;
                    }
                  })}
                </div>
                <div className="col-sm">
                  <h6>Basket 3</h6>
                  {this.state.data.map((item) => {
                    if (
                      item.basketno == 3 &&
                      item.semester == this.state.semester
                    ) {
                      return <Subjectcard data={item} key={item._id} />;
                    }
                  })}
                </div>
                <div className="col-sm">
                  <h6>Basket 4</h6>
                  {this.state.data.map((item) => {
                    if (
                      item.basketno == 4 &&
                      item.semester == this.state.semester
                    ) {
                      return <Subjectcard data={item} key={item._id} />;
                    }
                  })}
                </div>
                <div className="col-sm">
                  <h6>Basket 5</h6>
                  {this.state.data.map((item) => {
                    if (
                      item.basketno == 5 &&
                      item.semester == this.state.semester
                    ) {
                      return <Subjectcard data={item} key={item._id} />;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <img src={imageforpage} alt="logo" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}