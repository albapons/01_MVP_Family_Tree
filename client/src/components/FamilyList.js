import React, { Component } from "react";

export default class FamilyList extends Component {
  deletePerson = (id) => {
    fetch(`/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ allFamily: response });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let allFamily = this.props.allFamily;

    return (
      <div>
        <ul className="container my-4">
          {allFamily.map((e, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <span>
                {e.firstName} {e.lastName}
              </span>
              <button
                className="btn btn-outline-warning"
                onClick={() => this.deletePerson(e.id)}
              >
                <i className="fas fa-user-minus text-warning"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
