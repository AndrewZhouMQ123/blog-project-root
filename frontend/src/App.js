import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Components/Header.js";
import AddVlog from "./Components/AddVlog";
import AddUser from "./Components/AddUser";
import VlogList from "./Components/VlogList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header name="Andrew Zhou" />
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/vlogs"} className="navbar-brand">
            AndrewZhou
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/vlogs"} className="nav-link">
                VlogList
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addVlog"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/vlogs" element={<VlogList/>} />
            <Route path="/addVlog" element={<AddVlog/>} />
            <Route path="/users" element={<AddUser/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
