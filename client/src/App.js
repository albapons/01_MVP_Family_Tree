import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFamily: [],
    };
  }

  componentDidMount() {
    this.getFamily();
  }

  getFamily = () => {
    fetch(`/family`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ allFamily: response });
      })
      .catch((err) => console.log(err));
  };

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
    return (
      <div className="container my-4">
        <h3>My family</h3>
        <ul>
          {this.state.allFamily.map((e, index) => (
            <li key={index}>
              <span>
                {e.firstName} {e.lastName}
              </span>
              <button onClick={() => this.deletePerson(e.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input placeholder="First Name"></input>
        <input placeholder="Last Name"></input>
        <div className="form-group">
          <label htmlFor="sel1">Select progenitor 1:</label>
          <select className="form-control" id="sel1">
            {this.state.allFamily.map((e, index) => (
              <option key={index}>
                {e.firstName} {e.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sel1">Select progenitor 2:</label>
          <select className="form-control" id="sel1">
            {this.state.allFamily.map((e, index) => (
              <option key={index}>
                {e.firstName} {e.lastName}
              </option>
            ))}{" "}
          </select>
        </div>
      </div>
    );
  }
}

export default App;
