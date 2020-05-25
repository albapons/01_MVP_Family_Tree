import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFamily: null,
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
      <div>
        <ul>
          {this.state.allFamily.map((e, index) => (
            <li key={index}>
              <span>
                {e.firstname} {e.lastname}
              </span>
              <button
                onClick={() => this.deletePerson(e.id)}
                className=" mx-2btn btn-sm btn-outline-danger"
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
