// Third party lib
const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

// Node js lib
const path = require('path')

// Routes
const mahasiswaRoute = require('./routes/mahasiswa')
const authenticationRoute = require('./routes/authentication')
const dosenRoute = require('./routes/dosen')
const dokterRoute = require('./routes/dokter')

const app = express()

// setup express
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Database setup
// ====================================================================
// Connect to atlas
// mongoose.connect("mongodb+srv://izza:2ReVT0ZGpn5cdcZk@uhealth.uujgnqs.mongodb.net/uhealth?retryWrites=true&w=majority")

// Connect to mongodb local
// mongoose.connect("mongodb://localhost:27017/uhealth")
// const db = mongoose.connection;
// db.on('error', err => console.log(err))
// db.once('open', () => console.log('Connected to mongodb'))

// Middleware
app.use(ejsLayout)
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit : '50mb', extended : true}))

app.get('/', (req, res) => {
    //redirect sementara
    res.redirect('/mahasiswa')
})

app.use('/auth', authenticationRoute)
app.use('/mahasiswa', chooseLayout('mahasiswa') , mahasiswaRoute)
app.use('/dosen', chooseLayout('dosen') , dosenRoute)
app.use('/dokter', chooseLayout('dokter') , dokterRoute)


// Middleware to choose the layout based on the route / user
function chooseLayout(route){
    return (req, res, next) => {
        res.locals.layout = `layouts/${route}-layout`
        next()
    }
}

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})