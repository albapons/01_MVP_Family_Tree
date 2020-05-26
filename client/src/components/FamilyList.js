import React, { Component } from "react";
import api from "../utils/api";

export default class FamilyList extends Component {
  onDeletePerson = (id) => {
    console.log(id);

    api.deletePerson(id).then((response) => {
      this.props.onDeletePerson(response.msg);
    });
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
                onClick={() => this.onDeletePerson(e.id)}
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
