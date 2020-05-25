import React, { Component } from "react";
import "./App.css";
import FamilyForm from "./components/FamilyForm";
import FamilyList from "./components/FamilyList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/form" className="nav-link">
                    Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Family Tree
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/">
              <FamilyList allFamily={this.state.allFamily} />
            </Route>
            <Route path="/form">
              <FamilyForm allFamily={this.state.allFamily} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
