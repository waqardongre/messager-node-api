const messageRepository  = require('../repository/message.repository');

class MessageService {

    constructor() {}

    async getMessages() {
        return await messageRepository.getMessages();
    }

    async getMessagesCount() {
        return await messageRepository.getMessagesCount();
    }

    async sendMessage(Message) {
        return await messageRepository.sendMessage(Message);
    }

}

module.exports = new MessageService();