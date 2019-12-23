const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    doctoid: { type: String, trim: true },
    patientid: { type: String, trim: true },
    weight: { type: String, trim: true },
    bloodPressure: { type: String, trim: true },
    pregnancyWeek: { type: String, trim: true },
    symptoms: { type: String },
    file: { type: String, trim: true }
})

const reportModel = mongoose.model('report', reportSchema)
module.exports = reportModel