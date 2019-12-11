const Doctor = require('../../modals/doctor/doctor')


const allPendingDoctors = (req, res) => {
    Doctor.find({ approve_status: 'false' }, { email: 1, fullname: 1 }).sort({ _id: -1 })
        .then(doctors => {
            if (doctors) {
                res.status(200).json({
                    doctors
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


const doctorRequestApprove = (req, res) => {
    Doctor.findOne({ _id: req.params.id })
        .then(doctor => {
            if (doctor) {
                Doctor.updateOne(
                    { _id: req.params.id },
                    { $set: { approve_status: 'true' } })
                    .then(data => {
                        if (data) {
                            res.status(200).json({
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
    allPendingDoctors,
    doctorRequestApprove
}