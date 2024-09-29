import { $api } from "../http";

export default class UserService {
    static async getUser(value = "") {
        return $api.get(`/users/find/${value}`);
    }

    static async fetchUsers() {
        return $api.get(`/users`);
    }

    static async approveOrDecline(obn) {
        console.log("*Suofijioejfoiwjiofwjiofjwiofjow")
        return $api.post(`/users/set/app-or-decline`, obn);
    }
}