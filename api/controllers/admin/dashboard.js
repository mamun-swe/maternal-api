const Patient = require('../../modals/patient/patient')
const Doctor = require('../../modals/doctor/doctor')

const countPatient = (req, res) => {
    Patient.count({ approve_status: 'true' })
        .then(totalpatient => {
            res.json({
                totalpatient
            })
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

const countPatientRequest = (req, res) => {
    Patient.count({ approve_status: 'false' })
        .then(totalpatient => {
            res.json({
                totalpatient
            })
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

const countDoctor = (req, res) => {
    Doctor.count({ approve_status: 'true' })
        .then(totaldoctor => {
            res.json({
                totaldoctor
            })
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

const countDoctorRequest = (req, res) => {
    Doctor.count({ approve_status: 'false' })
        .then(totaldoctor => {
            res.json({
                totaldoctor
            })
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
    countPatient,
    countPatientRequest,
    countDoctor,
    countDoctorRequest
}