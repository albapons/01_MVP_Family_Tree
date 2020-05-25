import React, { Component } from "react";

export default class FamilyList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let allFamily = this.props.allFamily;

    return (
      <div>
        <ul>
          {allFamily.map((e, index) => (
            <li key={index}>
              <span>
                {e.firstName} {e.lastName}
              </span>
              <button onClick={() => this.deletePerson(e.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
