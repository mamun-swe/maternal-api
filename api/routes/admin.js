const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/authenticate')
const AuthControllers = require('../controllers/admin/auth')
const DashboardControllers = require('../controllers/admin/dashboard')
const DoctorControllers = require('../controllers/admin/doctor')
const PatientsControllers = require('../controllers/admin/patients')

router.get('/create-admin', AuthControllers.createAdmin) 
router.post('/login', AuthControllers.adminLogin)

router.get('/total-patient', Authenticate, DashboardControllers.countPatient)
router.get('/patient-request', Authenticate, DashboardControllers.countPatientRequest)
router.get('/total-doctor', Authenticate, DashboardControllers.countDoctor)
router.get('/doctor-request', Authenticate, DashboardControllers.countDoctorRequest)

router.get('/pending-doctors', Authenticate, DoctorControllers.allPendingDoctors)
router.patch('/approve-doctor/:id', DoctorControllers.doctorRequestApprove)

router.get('/pending-patients', Authenticate, PatientsControllers.allPendingPatients)
router.patch('/approve-patient/:id', PatientsControllers.patientRequestApprove)


module.exports = router