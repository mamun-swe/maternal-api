const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/doctor/auth')
const Authenticate = require('../middleware/authenticate')
const requestControllers = require('../controllers/doctor/patient-request')

router.post('/create-account', authControllers.doctorRegistration)
router.get('/logged-doctor/:id', authControllers.loggedDoctor)

router.get('/consult-requests/:id', Authenticate, requestControllers.allPatientRequests)

module.exports = router