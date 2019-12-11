const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// mongoose.connect('mongodb://localhost:27017/maternal-health', {
mongoose.connect('mongodb+srv://mamun:Yvzqcdms3ppWKM1x@cluster0-vxoak.mongodb.net/health?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


const adminRoute = require('./api/routes/admin')
const doctorRoute = require('./api/routes/doctor')
const patientRoute = require('./api/routes/patient')
const loginRoute = require('./api/routes/doctor-patient-login')
app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/patient', patientRoute)
app.use('/api/login', loginRoute)

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('I am root route')
})

app.listen(port, () => {
    console.log(`Server running on ${port} port`)
})