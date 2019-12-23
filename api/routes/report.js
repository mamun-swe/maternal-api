const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/authenticate')
const reportControllers = require('../controllers/consult/report')

router.post('/patient-report-submit', Authenticate, reportControllers.patientReportSubmit)
router.get('/patient-info/:id', Authenticate, reportControllers.patientInformation)
router.post('/send-message', Authenticate, reportControllers.postChatMessage)
router.get('/get-message/:doctoid/:patientid', reportControllers.getMessage)

module.exports = router
