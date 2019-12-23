const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consultRequestSchema = new Schema({
    doctoid: { type: String, trim: true },
    patientid: { type: String, trim: true },
    patientname: { type: String, trim: true },
    symptoms: { type: String, trim: true },
    date: { type: Date }
})

const consultRequestModel = mongoose.model('consultRequest', consultRequestSchema)
module.exports = consultRequestModel