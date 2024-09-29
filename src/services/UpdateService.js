import { $api } from "../http";

export default class UpdateService {
    static async getLatestUpdates() {
        return $api.get('/updates');
    }
}