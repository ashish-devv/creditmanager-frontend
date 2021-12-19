import React, { Component } from "react";
import Navbarr from "./Navbarr";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Navbarr />
        <h1 className="h4">{this.props.match.params.regno}</h1>
      </div>
    );
  }
}
