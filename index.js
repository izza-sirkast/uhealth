// Third party lib
const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

// Node js lib
const path = require('path')

// Routes
const dashboardRoute = require('./routes/index')
const mahasiswaRoute = require('./routes/mahasiswa')
const authenticationRoute = require('./routes/authentication')

const app = express()

// setup express
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set('layout', 'layouts/main-layout.ejs')

// Database setup
// mongoose.connect("mongodb+srv://team3:5tmCbusc79gV3xpW@uhealth.uujgnqs.mongodb.net/uhealth?retryWrites=true&w=majority")
// const db = mongoose.connection;
// db.on('error', err => console.log(err))
// db.once('open', () => console.log('Connected to MongoDB atlas'))

// Middleware
app.use(ejsLayout)
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit : '50mb', extended : true}))

app.use('/auth', authenticationRoute)
app.use('/mahasiswa', mahasiswaRoute)
app.use('/', dashboardRoute)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})