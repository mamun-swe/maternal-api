const Patient = require('../../modals/patient/patient')


const allPendingPatients = (req, res) => {
    Patient.find({ approve_status: 'false' }, { email: 1, fullname: 1 }).sort({ _id: -1 })
        .then(patients => {
            if (patients) {
                res.status(200).json({
                    patients
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


const patientRequestApprove = (req, res) => {
    Patient.findOne({ _id: req.params.id })
        .then(patient => {
            if (patient) {
                Patient.updateOne(
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
    allPendingPatients,
    patientRequestApprove
}