import React, { Component } from "react";

export default class Semestertable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <table className="table table-striped table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col">Subject Code</th>
              <th scope="col">Name</th>
              <th scope="col">Credit</th>
            </tr>
          </thead>
          <tbody>
            {/* print all basket 1 subject */}
            {this.props.data.map((item, index) => {
              if (item.semester === this.props.semester) {
                return (
                  <tr>
                    <th scope="row">{item.subjectcode}</th>
                    <td>{item.subjectname}</td>
                    <td>{item.subjectcredit}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
