const multer = require('multer')
const Report = require('../../modals/consult/report')
const Chat = require('../../modals/consult/chat')
const Request = require('../../modals/doctor/consult-requests')

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname)
    }
});
var upload = multer({ storage: store }).single('file')

const patientReportSubmit = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        const newReport = new Report({
            doctoid: req.body.doctoid,
            patientid: req.body.patientid,
            weight: req.body.weight,
            bloodPressure: req.body.bloodPressure,
            pregnancyWeek: req.body.pregnancyWeek,
            symptoms: req.body.symptoms,
            file: req.file.filename
        })
        newReport.save()
            .then(data => {
                res.status(201).json({
                    message: 'success'
                })
                // Save Consult request
                const newRequest = new Request({
                    doctoid: req.body.doctoid,
                    patientid: req.body.patientid,
                    patientname: req.body.name,
                    symptoms: req.body.symptoms,
                    date: Date()
                })
                newRequest.save()
                    .then(data => {
                        res.status(201).json({
                            message: 'success'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'error'
                        })
                    })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'error'
                })
            })
    })

}


const patientInformation = (req, res) => {
    Report.find({ patientid: req.params.id }).sort({ _id: -1 })
        .then(documents => {
            const response = {
                info: documents.map(doc => {
                    return {
                        // content: doc.content,
                        weight: doc.weight,
                        bloodPressure: doc.bloodPressure,
                        pregnancyWeek: doc.pregnancyWeek,
                        symptoms: doc.symptoms,
                        file: "http://localhost:3000/uploads/" + doc.file
                    };
                })
            };
            res.status(200).json(response);

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


const postChatMessage = (req, res) => {
    const newChat = new Chat({
        doctoid: req.body.doctorid,
        patientid: req.body.patientid,
        content: req.body.content,
        sender_type: req.body.sender_type
    })
    newChat.save()
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

const getMessage = (req, res) => {
    Chat.find({ $and: [{ doctoid: req.params.doctoid }, { patientid: req.params.patientid }] })
        .then(history => {
            if (history) {
                res.status(200).json({
                    history
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
    patientReportSubmit,
    patientInformation,
    postChatMessage,
    getMessage
}