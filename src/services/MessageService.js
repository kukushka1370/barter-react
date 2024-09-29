import { $api } from "../http";

export default class MessageService {
    static async createMessage(msgInfo) {
        return $api.post(`/message`, msgInfo);
    }

    static async getMessages(chatId = 0) {
        return $api.get(`/message/${chatId}`);
    }

    static async createGroupChatMessage(msgInfo) {
        return $api.post(`message/group-chat/new`, msgInfo);
    }

    static async getGroupChatMessages() {
        return $api.get(`message/group-chat/all`);
    }
}