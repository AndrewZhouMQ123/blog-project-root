import React, { Component } from "react";
import UserDataService from "../Services/user.service";

class UserList extends Component {
    state = {
        users: [],
        message: "",
    };

    componentDidMount() {
        this.retrieveUsers();
    }

    retrieveUsers = () => {
        UserDataService.getAll()
            .then(response => {
                this.setState({
                    users: response.data,
                });
            })
            .catch(error => {
                console.error("Error retrieving users:", error);
                this.setState({
                    message: "Failed to retrieve users."
                });
            });
    };

    render() {
        const { users, message } = this.state;

        return (
            <div>
                <h2>User List</h2>
                {message && <div>{message}</div>}
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.username} - {user.email}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserList;
