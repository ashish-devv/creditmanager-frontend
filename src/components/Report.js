import React, { Component } from "react";
import Navbarr from "./Navbarr";
import { ProgressBar } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import Baskettable from "./Baskettable";
import Semestertable from "./Semestertable";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketview: false,
      studentdetails: [],
      completed: [],
      user: [],
    };
    this.handelChange = this.handelChange.bind(this);
    this.getstudentdetails = this.getstudentdetails.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }
  componentDidMount() {
    this.getstudentdetails();
  }
  // function to hit get all subject api
  getstudentdetails = () => {
    fetch(
      "http://localhost:5000/api/getsubjectlist/" +
        this.props.match.params.regno
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 1) {
          //redirect to home page
          this.props.history.push("/");
        }
        console.log(data);
        console.log(this.calculateTotal(data.subjectlist));
        this.setState({
          studentdetails: data.subjectlist,
          completed: this.calculateTotal(data.subjectlist),
          user: data.user,
        });
      });
  };
  // function to calculate total of basket
  calculateTotal = (subjectlist) => {
    var basket1 = subjectlist.reduce((acc, item) => {
      if (item.basketno === 1) {
        return acc + item.subjectcredit;
      }
      return acc;
    }, 0);
    var basket2 = subjectlist.reduce((acc, item) => {
      if (item.basketno === 2) {
        return acc + item.subjectcredit;
      }
      return acc;
    }, 0);
    var basket3 = subjectlist.reduce((acc, item) => {
      if (item.basketno === 3) {
        return acc + item.subjectcredit;
      }
      return acc;
    }, 0);
    var basket4 = subjectlist.reduce((acc, item) => {
      if (item.basketno === 4) {
        return acc + item.subjectcredit;
      }
      return acc;
    }, 0);
    var basket5 = subjectlist.reduce((acc, item) => {
      if (item.basketno === 5) {
        return acc + item.subjectcredit;
      }
      return acc;
    }, 0);

    //return all value
    return [basket1, basket2, basket3, basket4, basket5];
  };
  handelChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div>
        <Navbarr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <div className="card mt-4 border-dark cardshadow ">
                <div className="card-body">
                  <div className="text-center">
                    <h3 className="card-title">Report</h3>

                    <button
                      className="btn btn-outline-success btn-sm text-center"
                      onClick={() => {
                        window.print();
                      }}
                    >
                      Download Report &nbsp;<i class="fas fa-file-download"></i>
                    </button>
                    <br />
                    <br />

                    {/* image having profile picture dummy image */}
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="profile"
                      className="rounded-circle"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <hr />
                    <h3
                      className="
                  card-title"
                    >
                      {this.state.user.name}
                    </h3>
                  </div>
                  <p className="card-text">
                    {/* button to download report */}

                    <br />
                    <label className="font-weight-bold text-start">
                      Basket 1
                    </label>
                    <ProgressBar
                      animated
                      now={(this.state.completed[0] / 18) * 100}
                      striped
                      variant={
                        (this.state.completed[0] / 18) * 100 > 50
                          ? "success"
                          : "danger"
                      }
                      className="mt-1"
                      label={`(${this.state.completed[0]} / 18)`}
                    />
                    <label className="font-weight-bold text-start">
                      Basket 2
                    </label>
                    <ProgressBar
                      animated
                      now={(this.state.completed[1] / 18) * 100}
                      striped
                      variant={
                        (this.state.completed[1] / 18) * 100 > 50
                          ? "success"
                          : "danger"
                      }
                      className="mt-1"
                      label={`(${this.state.completed[1]} / 18)`}
                    />
                    <label className="font-weight-bold text-start">
                      Basket 3
                    </label>
                    <ProgressBar
                      animated
                      now={(this.state.completed[2] / 18) * 100}
                      striped
                      variant={
                        (this.state.completed[2] / 18) * 100 > 50
                          ? "success"
                          : "danger"
                      }
                      className="mt-1"
                      label={`(${this.state.completed[2]} / 18)`}
                    />
                    <label className="font-weight-bold text-start">
                      Basket 4
                    </label>
                    <ProgressBar
                      animated
                      now={(this.state.completed[3] / 18) * 100}
                      striped
                      variant={
                        (this.state.completed[3] / 18) * 100 > 50
                          ? "success"
                          : "danger"
                      }
                      className="mt-1"
                      label={`(${this.state.completed[3]} / 18)`}
                    />
                    <label className="font-weight-bold text-start">
                      Basket 5
                    </label>
                    <ProgressBar
                      animated
                      now={(this.state.completed[4] / 18) * 100}
                      striped
                      variant={
                        (this.state.completed[4] / 18) * 100 > 50
                          ? "success"
                          : "danger"
                      }
                      className="mt-1"
                      label={`(${this.state.completed[4]} / 18)`}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-9">
              <div className="form-check form-switch mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="basketview"
                  name="basketview"
                  checked={this.state.basketview}
                  onChange={this.handelChange}
                />
                <label className="form-check-label" for="basketview">
                  Switch To Semester View.
                </label>
              </div>
              {this.state.basketview ? (
                <div className="card border-dark cardshadow mt-1">
                  <div className="card-body">
                    <h3 className="h3">Semester 1</h3>
                    <Semestertable
                      semester={1}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 2</h3>
                    <Semestertable
                      semester={2}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 3</h3>
                    <Semestertable
                      semester={3}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 4</h3>
                    <Semestertable
                      semester={4}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 5</h3>
                    <Semestertable
                      semester={5}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 6</h3>
                    <Semestertable
                      semester={6}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 7</h3>
                    <Semestertable
                      semester={7}
                      data={this.state.studentdetails}
                    />
                    <h3 className="h3">Semester 8</h3>
                    <Semestertable
                      semester={8}
                      data={this.state.studentdetails}
                    />
                  </div>
                </div>
              ) : (
                <div className="card border-dark cardshadow mt-1">
                  <div className="card-body">
                    <h3 className="h3">Basket 1 </h3>
                    <Baskettable
                      data={this.state.studentdetails}
                      basketno={1}
                      completed={this.state.completed[0]}
                    />
                    <h3 className="h3">Basket 2 </h3>
                    <Baskettable
                      data={this.state.studentdetails}
                      basketno={2}
                      completed={this.state.completed[1]}
                    />
                    <h3 className="h3">Basket 3 </h3>
                    <Baskettable
                      data={this.state.studentdetails}
                      basketno={3}
                      completed={this.state.completed[2]}
                    />
                    <h3 className="h3">Basket 4 </h3>
                    <Baskettable
                      data={this.state.studentdetails}
                      basketno={4}
                      completed={this.state.completed[3]}
                    />
                    <h3 className="h3">Basket 5 </h3>
                    <Baskettable
                      data={this.state.studentdetails}
                      basketno={5}
                      completed={this.state.completed[4]}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <h1 className="h4">{this.props.match.params.regno}</h1> */}
      </div>
    );
  }
}
