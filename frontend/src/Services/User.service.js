import http from "../http-common";

class UserDataService {
    create(data) {
        return http.post("/users", data);
    }
}

const userDataService = new UserDataService();

export default userDataService;