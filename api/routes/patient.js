const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/patient/auth')

router.post('/create-account', authControllers.patientRegistration)



module.exports = router