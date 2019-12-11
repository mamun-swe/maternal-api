const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: { type: String, trim: true},
    email: { type: String, trim: true},
    password: { type: String, trim: true }
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel