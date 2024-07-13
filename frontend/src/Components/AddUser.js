import React, { Component } from "react";
import UserDataService from "../Services/User.service";

import "./AddUser.css";
import PasswordStrength from "./PasswordStrength";
import { EmailValidation } from "./EmailValidation";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      message: "",
      matchResult: "",
      submitted: false,
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  saveUser() {
    // validation
    const validateResult = EmailValidation("email", this.state.email);
    const passwordMatch = this.validateConfirmPassword(this.state.password, this.state.confirmPassword);

    if ((validateResult !== "") || (passwordMatch !== "")) {
      this.setState({
        message: validateResult,
        matchResult: passwordMatch,
      });
    } else {
      var data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      };

      UserDataService.create(data)
        .then((response) => {
          this.setState({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
            message: response.data.message,
          });
          if (response.data.message === "Email duplicate") {
            this.setState({ submitted: false });
          } else {
            this.setState({ submitted: true });
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log("exception during call user service:" + error);
        });
    }
  }

  newUser() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      message: "",
      submitted: false,
    });
  }

  messageClass(message) {
    if (message === "You registered successfully!") {
      return "successMessage";
    }
    else {
      return "errorMessage";
    }
  }

  validateConfirmPassword(password, confirmPassword) {
    // confirm Password validation
    let result = (password === confirmPassword);
    return result ? "" : "Password and Confirm Password does not match.";
  }

  render() {
    return (
      <div className="registerForm">
        <h4 className={`${this.messageClass(this.state.message)}`}> {this.state.message} </h4>
        {this.state.submitted ? (
          <div>
            <button className="btn btn-success" onClick={this.newUser}>
              New Form
            </button>
          </div>
        ) : (
          <div>
            <div className="username">
              <label className="formLabel" htmlFor="firstName">
                First Name:
                <input
                  className="formInput"
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  required
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                />
              </label>
            </div>
            <div className="lastname">
              <label className="formLabel" htmlFor="lastName">
                Last Name:
                <input
                  className="formInput"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  required
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                />
              </label>
            </div>
            <div className="username">
              <label className="formLabel" htmlFor="username">
                Username:
                <input
                  className="formInput"
                  type="text"
                  id="username"
                  placeholder="Username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </label>
            </div>
            <div className="email">
              <label className="formLabel" htmlFor="email">
                Email:
                <input
                  className="formInput"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </label>
            </div>
            <div className="password">
              <label className="formLabel" htmlFor="password">
                Password:
                <input
                  className="formInput"
                  id="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <PasswordStrength password={this.state.password} />
              </label>
            </div>
            <div className="confirm-password">
              <label className="formLabel" htmlFor="confirmPassword">
                Confirm Password:
                <input
                  className="formInput"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                />
                <span className='errorMessage'>{this.state.matchResult}</span>
                <PasswordStrength password={this.state.confirmPassword} />
              </label>
            </div>
            <div className="button">
              <button
                onClick={this.saveUser}
                type="submit"
                className="btn btn-success"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
