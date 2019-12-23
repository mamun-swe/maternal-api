const Doctor = require('../modals/doctor/doctor')
const Patient = require('../modals/patient/patient')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const doctorPatientAuth = (req, res) => {
    if (req.body.userType == 'patient') {
        const password = req.body.password

        Patient.findOne({ $and: [{ username: req.body.username }, { approve_status: 'true' }] })
            .then(patient => {
                if (patient) {
                    bcrypt.compare(password, patient.password, (err, result) => {
                        if (err) {
                            res.json({
                                message: 'error'
                            })
                        }
                        if (result) {
                            const token = jwt.sign({ _id: patient._id }, 'SECRET',
                                { expiresIn: '30d' })
                            res.status(200).json({
                                message: 'success',
                                token,
                                id: patient._id,
                                name: patient.fullname,
                                type: patient.user_type
                            })
                        } else {
                            res.status(204).json({
                                message: 'error'
                            })
                        }
                    })

                } else {
                    res.status(204).json({
                        message: 'error'
                    })
                }
            })
            .catch(err => {
                res.status(501).json({
                    message: 'error'
                })
            })
    }
    if (req.body.userType == 'doctor') {
        const password = req.body.password

        Doctor.findOne({ $and: [{ username: req.body.username }, { approve_status: 'true' }] })
            .then(doctor => {
                if (doctor) {
                    bcrypt.compare(password, doctor.password, (err, result) => {
                        if (err) {
                            res.json({
                                message: 'error'
                            })
                        }
                        if (result) {
                            const token = jwt.sign({ _id: doctor._id }, 'SECRET',
                                { expiresIn: '30d' })
                            res.status(200).json({
                                message: 'success',
                                token,
                                id: doctor._id,
                                name: doctor.fullname,
                                type: doctor.user_type
                            })
                        } else {
                            res.status(204).json({
                                message: 'error'
                            })
                        }
                    })

                } else {
                    res.status(204).json({
                        message: 'error'
                    })
                }
            })
            .catch(err => {
                res.status(501).json({
                    message: 'error'
                })
            })
    }
}


module.exports = {
    doctorPatientAuth
}