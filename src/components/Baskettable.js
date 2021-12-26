import React, { Component } from "react";

export default class Baskettable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col">Subject Code</th>
              <th scope="col">Name</th>
              <th scope="col">Credit</th>
            </tr>
          </thead>
          <tbody>
            {/* print all  basket 1 subjects */}
            {this.props.data.map((item, index) => {
              if (item.basketno === this.props.basketno) {
                return (
                  <tr>
                    <th scope="row">{item.subjectcode}</th>
                    <td>{item.subjectname}</td>
                    <td>{item.subjectcredit}</td>
                  </tr>
                );
              }
            })}
            <tr className="table-success text-center ">
              <th scope="row" colSpan={2}>
                Total Completed credit
              </th>
              <td>
                {/* sum all basket 1 credit */}
                <span className="badge bg-primary">{this.props.completed}</span>
              </td>
            </tr>
            <tr className="table-danger text-center">
              <th scope="row" colSpan={2}>
                Remaining Credit
              </th>
              <td>
                <span className="badge bg-danger">
                  {this.props.basket - this.props.completed}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
