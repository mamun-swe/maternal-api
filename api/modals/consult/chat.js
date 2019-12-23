const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    doctoid: { type: String, trim: true },
    patientid: { type: String, trim: true },
    content: { type: String },
    sender_type: { type: String } 
})

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel