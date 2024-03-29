if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Third party lib
const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')

// Node js lib
const path = require('path')

// Local lib
const {passportSetup, checkAuthenticated, checkIsMahasiswa, checkIsDosen, checkIsDokter} = require('./utils/authentication/passport-authentication')

const app = express()

// setup express
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Database setup
// ====================================================================
// Connect to atlas
mongoose.connect(process.env.DATABASE_URL)

// Connect to mongodb local
// mongoose.connect("mongodb://localhost:27017/uhealth")
const db = mongoose.connection;
db.on('error', err => console.log(err))
db.once('open', () => console.log('Connected to mongodb'))

// Middleware
app.use(ejsLayout)
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit : '50mb', extended : true}))
app.use(session({
    secret: 'theonepieceisreal10',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        dbName: 'uhealth'
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))
app.use(flash())

//Initialize passport for authentication
passportSetup(passport)

// Routes
const mahasiswaRoute = require('./routes/mahasiswa')
const authenticationRoute = require('./routes/authentication')
const dosenRoute = require('./routes/dosen')
const dokterRoute = require('./routes/dokter')

app.use('/auth', authenticationRoute)
app.use('/mahasiswa', chooseLayout('mahasiswa'), checkIsMahasiswa , mahasiswaRoute)
app.use('/dosen', chooseLayout('dosen'), checkIsDosen , dosenRoute)
app.use('/dokter', chooseLayout('dokter'), checkIsDokter , dokterRoute)

app.get('/', (req, res) => {
    console.log('tes')
    res.redirect('/mahasiswa')
})

// Middleware to choose the layout based on the route / user
function chooseLayout(route){
    return (req, res, next) => {
        res.locals.layout = `layouts/${route}-layout`
        res.locals.user = req.user
        next()
    }
}

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running on http://localhost:8000')
})