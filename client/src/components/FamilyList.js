import React, { Component } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default class FamilyList extends Component {
  onDeletePerson = (id) => {
    console.log(id);

    api.deletePerson(id).then((response) => {
      this.props.onDeletePerson(response.msg);
    });
  };

  render() {
    let { allFamily } = this.props;

    return (
      <div>
        <ul className="container my-4">
          {allFamily.map((e, index) => (
            <li
              className="list-group-item  d-flex justify-content-between align-items-center"
              key={index}
            >
              <span>
                <Link to={`/tree/${e.id}`}>
                  <p className="text-dark">
                    {e.firstName} {e.lastName}
                  </p>
                </Link>
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
        {/* {msg && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {msg}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )} */}
      </div>
    );
  }
}
