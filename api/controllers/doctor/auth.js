const Doctor = require('../../modals/doctor/doctor')
const bcrypt = require('bcrypt')

const doctorRegistration = (req, res) => {
    Doctor.findOne({ $or: [{ phone: req.body.phone }, { email: req.body.email }, { username: req.body.username }] })
        .then(doctor => {
            if (doctor) {
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
                    const newDoctor = new Doctor({
                        fullname: req.body.fullName,
                        username: req.body.username,
                        password: hash,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address,
                        user_type: req.body.userType,
                        approve_status: 'false'
                    })
                    newDoctor.save()
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


const loggedDoctor = (req, res) => {
    Doctor.findById({ _id: req.params.id })
        .then(doctor => {
            if (doctor) {
                res.status(200).json({
                    doctor
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
    doctorRegistration,
    loggedDoctor
}