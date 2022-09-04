const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({ 
                message: 'string', 
                from: 'string', 
                to: 'string',
                toFirstName: 'string',
                toLastName: 'string',
                createDate: 'date', 
                updatedDate: 'date', 
                createdBy: 'string', 
                updatedBy: 'string' },
                { timestamps: { createDate: 'created_at', updatedDate: 'updated_at'}})

const Message = mongoose.model('messages', messageSchema)
module.exports = {
    Message
}