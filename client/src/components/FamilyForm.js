import React, { Component } from "react";

export default class FamilyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      progenitor_1: null,
      progenitor_2: null,
    };
  }
  render() {
    let allFamily = this.props.allFamily;
    return (
      <div className="container my-4 ">
        <input placeholder="First Name" className="form-control my-2"></input>
        <input placeholder="Last Name" className="form-control my-2"></input>
        <div>
          {" "}
          <div className="form-group my-2">
            <select className="form-control" id="progenitor_1">
              <option selected>Select progenitor 1</option>
              {allFamily.map((e, index) => (
                <option key={index}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-2">
            <select className="form-control" id="progenitor_2">
              <option selected>Select progenitor 2</option>
              {allFamily.map((e, index) => (
                <option key={index}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn-lg btn-outline-warning font-weight-bold">
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}
