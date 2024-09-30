import { $api } from "../http";

export default class BankAccountService {
    static async fetchUserBankAccounts(userId) {
        return $api.get(`/bank/${userId}`);
    }

    static async addBankAccount(info) {
        return $api.post(`/bank/add`, info);
    }

    static async deleteBankAccount(userId, currencyCode) {
        return $api.delete(`/bank/${userId}/${currencyCode}`);
    }

    static async transferMoney(info) {
        return $api.post("/bank/transfer", info);
    }
}