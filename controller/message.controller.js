const messageService = require('../service/message.service');

class MessageController {

    async getMessages() {
        //console.log('message.controller: getMessages()')
        return await messageService.getMessages();
    }

    async getMessagesCount() {
        //console.log('message.controller: getMessagesCount()')
        return await messageService.getMessagesCount();
    }

    async sendMessage(Message) {
        //console.log('message.controller: sendMessage()', Message);
        return await messageService.sendMessage(Message);
    }

}
module.exports = new MessageController();