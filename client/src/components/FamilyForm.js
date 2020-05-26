import React, { Component } from "react";

export default class FamilyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      progenitor_1: "",
      progenitor_2: "",
    };
  }

  handleInput = (e) => {
    let value = e.target.value;
    if (e.target.value === "Select progenitor 1" || "Select progenitor 1") {
      value = null;
    }
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    let allFamily = this.props.allFamily;
    let { firstName, lastName, progenitor_1, progenitor_2 } = this.state;
    return (
      <div className="container my-4 ">
        <input
          placeholder="First Name"
          className="form-control my-2"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <input
          placeholder="Last Name"
          className="form-control my-2"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => this.handleInput(e)}
        ></input>
        <div>
          {" "}
          <div className="form-group my-2">
            <select
              className="form-control"
              name="progenitor_1"
              value={progenitor_1}
              onChange={(e) => this.handleInput(e)}
            >
              <option defaultValue>Select progenitor 1</option>
              {allFamily.map((e, index) => (
                <option key={index}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-2">
            <select
              className="form-control"
              name="progenitor_2"
              value={progenitor_2}
              onChange={(e) => this.handleInput(e)}
            >
              <option defaultValue>Select progenitor 2</option>
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
