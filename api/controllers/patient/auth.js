const Patient = require('../../modals/patient/patient')
const bcrypt = require('bcrypt')

const patientRegistration = (req, res) => {
    Patient.findOne({ $or: [{ phone: req.body.phone }, { email: req.body.email }, { username: req.body.username }] })
        .then(patient => {
            if (patient) {
                res.status(200).json({
                    message: 'exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    const newPatient = new Patient({
                        fullname: req.body.fullName,
                        username: req.body.username,
                        password: hash,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address,
                        user_type: req.body.userType,
                        approve_status: 'false'
                    })
                    newPatient.save()
                        .then(data => {
                            if (data) {
                                res.status(201).json({
                                    message: 'success'
                                })
                            }
                        })
                        .catch(err => {
                            if (err) {
                                res.status(501).json({
                                    message: 'error',
                                    errMessage: err
                                })
                            }
                        })
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(501).json({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}


const loggedPatient = (req, res) => {
    Patient.findById({ _id: req.params.id }, {password: 0})
        .then(patient => {
            if (patient) {
                res.status(200).json({
                    patient
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(501).json({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}


module.exports = {
    patientRegistration,
    loggedPatient
}