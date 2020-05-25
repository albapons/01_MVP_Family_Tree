import React, { Component } from "react";

export default class FamilyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let allFamily = this.props.allFamily;

    return (
      <div>
        <input placeholder="First Name"></input>
        <input placeholder="Last Name"></input>
        <div>
          {" "}
          <div className="form-group">
            <label htmlFor="sel1">Select progenitor 1:</label>
            <select className="form-control" id="sel1">
              {allFamily.map((e, index) => (
                <option key={index}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Select progenitor 2:</label>
            <select className="form-control" id="sel1">
              {allFamily.map((e, index) => (
                <option key={index}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
