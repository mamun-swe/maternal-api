const Doctor = require('../../modals/doctor/doctor')

const allDoctor = (req, res) => {
    Doctor.find({ approve_status: 'true' }, { fullname: 1, phone: 1 }).sort({ _id: -1 })
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

const singleDoctor = (req, res) => {
    Doctor.findOne({ _id: req.params.id }, { fullname: 1, phone: 1 })
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
    allDoctor,
    singleDoctor
}