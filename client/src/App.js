import React, { Component } from "react";
import "./App.css";
import FamilyForm from "./components/FamilyForm";
import FamilyList from "./components/FamilyList";
import Tree from "./components/Tree";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFamily: [],
      allParents: [],
      msg: "",
    };
  }

  componentDidMount() {
    this.getFamily();
  }

  getFamily = () => {
    fetch(`/family`)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({ allFamily: response });
      })
      .catch((err) => console.log(err));

  };

  onAddPerson = (msg) => {
    this.setState({ msg });
    console.log(msg);
    this.getFamily();
  };

  onDeletePerson = (msg) => {
    this.setState({ msg });
    console.log(msg);
    this.getFamily();
  };

  render() {
    return (
      <div className="container my-4">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/form" className="nav-link">
                    Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/list" className="nav-link">
                    Family List
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <h3 className="title">DRAW YOUR FAMILY</h3>
          <Switch>
            <Route path="/list">
              <FamilyList
                allFamily={this.state.allFamily}
                onDeletePerson={this.onDeletePerson}
              />
              {/* {this.state.msg && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {this.state.msg}
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
            </Route>
            <Route path="/form">
              <FamilyForm
                allFamily={this.state.allFamily}
                onAddPerson={this.onAddPerson}
              />
              {this.state.msg && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {this.state.msg}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
            </Route>
            <Route path="/tree/:id">
              <Tree></Tree>
            </Route>
            <Route path="/">
              <div className="container d-flex justify-content-center align-items-center">
                {/* <img src="../images/home.jpg" alt="error" width="auto"></img> */}
                <img
                  src="https://image.freepik.com/free-vector/types-families_23-2147532363.jpg"
                  alt="error"
                ></img>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
