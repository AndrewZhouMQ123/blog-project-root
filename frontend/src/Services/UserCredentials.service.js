import http from "../http-common";

class UserCredentialsService {
    // Create a new user
    create(data) {
        return http.post("/users", data);
    }

    // Retrieve all users
    getAll(email) {
        return http.get("/users", { params: { email } });
    }

    // Retrieve a user by username
    findByUsername(username) {
        return http.get(`/users/search`, { params: { username } });
    }

    // Update user by ID
    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    // Delete user by ID
    delete(id) {
        return http.delete(`/users/${id}`);
    }

    // Delete all users
    deleteAll() {
        return http.delete("/users");
    }
}

const userCredentialsService = new UserCredentialsService();

export default userCredentialsService;
