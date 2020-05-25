import React, { Component } from "react";
import "./App.css";
import FamilyForm from "./components/FamilyForm";

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

        <FamilyForm allFamily={this.state.allFamily} />

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
      </div>
    );
  }
}

export default App;
