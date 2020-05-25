import React, { Component } from "react";
import "./App.css";
import FamilyForm from "./components/FamilyForm";
import FamilyList from "./components/FamilyList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFamily: [],
      familyView: true,
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

  changeUser(isFamily) {
    this.setState({ familyView: isFamily });
  }

  render() {
    return (
      <div className="container my-4">
        <h3>My family</h3>
        <div className="container text-right">
          <button
            onClick={() => this.changeUser(true)}
            className={
              familyView
                ? "btn-sm btn-success text-light mx-2 my-2"
                : "btn-sm btn-light text-dark mx-2 my-2"
            }
            disabled={adminView}
          >
            FAMILY TREE
          </button>
          <button
            onClick={() => this.changeUser(false)}
            className={
              familyView
                ? "btn-sm btn-light text-dark mx-2 my-2"
                : "btn-sm btn-success text-light mx-2 my-2"
            }
            disabled={!familyView}
          >
            FORM
          </button>
        </div>

        <FamilyList allFamily={this.state.allFamily} />
      </div>
    );
  }
}

export default App;
