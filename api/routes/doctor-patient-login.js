const express = require('express')
const router = express.Router()
const LoginControllers = require('../controllers/doctor-patient-auth')

router.post('/login', LoginControllers.doctorPatientAuth)

module.exports = router