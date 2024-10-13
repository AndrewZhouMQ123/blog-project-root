import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UserRegister from "./Components/User/UserRegister";
import UserList from "./Components/User/UserList";
import VlogCreate from "./Components/Vlog/VlogCreate"; // Adjusted naming for consistency
import VlogList from "./Components/Vlog/VlogList";

const Header = ({ name }) => (
  <header className="header">
    <h1>{name}</h1>
  </header>
);

const App = () => {
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
              Vlog List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addVlog"} className="nav-link">
              Add Vlog
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Register User
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/vlogs" element={<VlogList />} />
          <Route path="/addVlog" element={<VlogCreate />} /> {/* Ensure this is consistent with your imports */}
          <Route path="/users" element={<UserRegister />} /> {/* Updated for consistency */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
