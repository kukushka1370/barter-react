import { $api } from "../http";

export default class StatisticsService {
    static async getStatistics() {
        return $api.get('/statistics/');
    }

    static async updateTotalMoney(updatedMoney = 0) {
        return $api.post('/statistics/change-total-money', updatedMoney);
    }

    static async updateCommission(arr) {
        return $api.post('/statistics/change-commission', arr);
    }

    static async updateMax(arr) {
        return $api.post('/statistics/change-max', arr);
    }

    static async getUserAgreement() {
        return $api.get('/pages/get-user-agreement');
    }

    static async getRules() {
        return $api.get('/pages/get-rules');
    }

    static async getCurrencies() {
        return $api.get('/bank/get-currencies');
    }
}