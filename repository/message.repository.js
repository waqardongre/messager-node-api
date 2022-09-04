const { connect } = require("../config/db.config");
const { accountSidVal, authTokenVal, messagingServiceSidVal } = require("../config/twillio.config");
const { Message } = require("../model/message.model");

class MessageRepository {

    constructor() {
        connect();
    }

    async getMessages() {
        try {
            const messages = await Message.find({})
            const messagesLength = messages.length === undefined ? 0 : messages.length
            console.log("messages count from getMessages():", messagesLength)
            return messages
        }
        catch(err) {
            return err
        }
    }
    
    async getMessagesCount() {
        try {
            const messages = await Message.find({});
            const messagesLength = messages.length === undefined ? 0 : messages.length
            console.log("messages count from getMessagesCount():", messagesLength)
            return messagesLength
        }
        catch(err) {
            return err
        }
    }

    async sendMessage(messageObj) {
        const accountSid = accountSidVal
        const authToken = authTokenVal
        const client = require("twilio")(accountSid, authToken)
        const messagingServiceSid = messagingServiceSidVal
        const msg = messageObj.msg
        const to = messageObj.to //phone no
        const toFirstName = messageObj.toFirstName
        const toLastName = messageObj.toLastName
        try {
            
            // Sending Message with Twillio API
            const sendMessagePromise = client.messages
            .create({
                body: msg,
                messagingServiceSid: messagingServiceSid,
                to: to
            })

            // Saving Message in MongoDB
            const messageObj = { 
                message: msg, 
                from: messagingServiceSid, 
                to: to,
                createDate: new Date(),
                updatedDate: new Date(),
                toFirstName: toFirstName,
                toLastName: toLastName
            }
            const saveMessagePromise = Message.create(messageObj)
            const promisesResponse = await Promise.all([sendMessagePromise, saveMessagePromise])
            return promisesResponse

        }
        catch(err) {
            console.log("Error in sendMessage(): " + err)
            return err
        }
    }
}

module.exports = new MessageRepository();