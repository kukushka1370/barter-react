import { $api } from "../http";

export default class StatisticsService {
    static async getStatistics() {
        return $api.get('/statistics/');
    }

    static async updateTotalMoney(updatedMoney = 0) {
        return $api.post('/statistics/change-total-money', updatedMoney);
    }
}