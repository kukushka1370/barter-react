import { $api } from "../http";

export default class AccountService {
    static async updateUserPassword(obj) {
        return $api.post(`/account/change-password`, obj);
    }
}