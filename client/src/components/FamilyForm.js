import React, { Component } from "react";
import api from "../utils/api";

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

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  };

  addPerson = () => {
    const { firstName, lastName, progenitor_1, progenitor_2 } = this.state;
    const person = { firstName, lastName, progenitor_1, progenitor_2 };

    if (progenitor_1 !== null && progenitor_1 === progenitor_2) {
      return alert(
        "The two parents cannot refer to the same person, please try again!"
      );
    }
    if (firstName || lastName !== "") {
      api
        .addPerson(person)
        .then((response) => {
          this.props.onAddPerson(response.msg);
        })
        .then(
          // reset this.state
          this.setState({
            firstName: "",
            lastName: "",
            // this doesn't works!
            progenitor_1: null,
            progenitor_2: null,
          })
        );
    } else {
      return alert(
        "First Name and Last Names are required fields, please try again!"
      );
    }
  };

  render() {
    let allFamily = this.props.allFamily;
    let { firstName, lastName } = this.state;
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
              onChange={(e) => this.handleInput(e)}
            >
              <option value={null}>Select progenitor 1</option>
              {allFamily.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-2">
            <select
              className="form-control"
              name="progenitor_2"
              onChange={(e) => this.handleInput(e)}
            >
              <option value={null}>Select progenitor 2</option>
              {allFamily.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={(e) => this.addPerson()}
              className="btn-lg btn-outline-warning font-weight-bold"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}
