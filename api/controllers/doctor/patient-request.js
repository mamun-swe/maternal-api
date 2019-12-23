const Request = require('../../modals/doctor/consult-requests')

const allPatientRequests = (req, res) => {
    Request.find({ doctoid: req.params.id }).sort({ _id: -1 })
    .then(requests => {
        if(requests) {
            res.status(200).json({
                requests
            })
        }
    })
    .catch(err => {
        if(err) {
            res.status(501).json({
                message: 'error',
                errMessage: err
            })
        }
    })
}






module.exports = {
    allPatientRequests
}