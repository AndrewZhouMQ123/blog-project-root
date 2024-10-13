import React, { Component } from "react";
import userCredentialsService from "../../Services/UserCredentials.service";

export default class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      message: "",
      submitted: false,
    };
  }

  handleInputChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  validateConfirmPassword = () => {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword ? "" : "Passwords do not match.";
  };

  saveUser = () => {
    const passwordMatch = this.validateConfirmPassword();
    if (passwordMatch) {
      this.setState({ message: passwordMatch });
      return;
    }

    const { firstName, lastName, username, password, email } = this.state;
    const data = { firstName, lastName, username, password, email };

    userCredentialsService.create(data)
      .then((response) => {
        // Assuming the backend returns user data without a message
        if (response.status === 201) {
          this.setState({
            message: "You registered successfully!",
            submitted: true,
          });
        } else if (response.status === 409) {
          // Handle duplicate email case
          this.setState({ message: "Email duplicate. Please use a different email." });
        }
      })
      .catch((error) => {
        // Handle general error message
        this.setState({ message: "An error occurred while creating the user." });
        console.error("Error creating user:", error);
      });
  };

  newUser = () => {
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      message: "",
      submitted: false,
    });
  };

  render() {
    const { firstName, lastName, username, email, password, confirmPassword, message, submitted } = this.state;

    return (
      <div className="registerForm">
        {submitted ? (
          <div>
            <h4>{message}</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              New Form
            </button>
          </div>
        ) : (
          <div>
            <h4>{message}</h4>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={this.handleInputChange("firstName")}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={this.handleInputChange("lastName")}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleInputChange("username")}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange("email")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange("password")}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.handleInputChange("confirmPassword")}
            />
            <button onClick={this.saveUser} className="btn btn-success">
              Register
            </button>
          </div>
        )}
      </div>
    );
  }
}
