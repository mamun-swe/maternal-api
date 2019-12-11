const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    fullname: { type: String, trim: true },
    username: { type: String, trim: true },
    password: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    user_type: { type: String, trim: true },
    approve_status: { type: String, trim: true }
})

const doctorModel = mongoose.model('doctor', doctorSchema)
module.exports = doctorModel