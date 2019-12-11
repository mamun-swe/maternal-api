const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/patient/auth')
const doctorControllers = require('../controllers/patient/doctor')

router.post('/create-account', authControllers.patientRegistration)
router.get('/logged-patient/:id', authControllers.loggedPatient)

router.get('/all-doctor', doctorControllers.allDoctor)
router.get('/single-doctor/:id', doctorControllers.singleDoctor)



module.exports = router