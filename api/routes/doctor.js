const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/doctor/auth')

router.post('/create-account', authControllers.doctorRegistration)
router.get('/logged-doctor', authControllers.loggedDoctor)


module.exports = router