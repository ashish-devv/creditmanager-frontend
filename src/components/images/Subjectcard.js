import React, { Component } from "react";

export default class Subjectcard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteSubject = this.deleteSubject.bind(this);
  }
  // function to delete the subject
  deleteSubject = () => {
    // get request to delete the subject
    fetch("http://localhost:5000/api/deletesubject/" + this.props.data._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 0) {
          // if success then reload the page
          window.location.reload();
        }
      });
  };
  render() {
    return (
      <div className="card  mt-1 border-dark">
        <div className="card-body">
          <h6 className="card-title">
            Sub Name:
            <span className="text-success"> {this.props.data.subjectname}</span>
          </h6>
          <p className="card-text">
            Sub Code : <b> {this.props.data.subjectcode} </b>
            <br />
            Credit : <b> {this.props.data.subjectcredit}</b>
            <hr />
            {/* create a delete button */}
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={this.deleteSubject}
            >
              <i className="fa fa-trash" />
            </button>{" "}
            &nbsp;
            {/* create a edit button */}
            <button className="btn btn-outline-warning btn-sm">
              <i className="fa fa-edit" />
            </button>
          </p>
        </div>
      </div>
    );
  }
}
