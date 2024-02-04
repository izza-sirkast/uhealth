const express = require('express')
const router = express.Router()

// Local libraries
const {checkNotAuthenticated} = require('../utils/authentication/passport-authentication.js')

router.get('/login', checkNotAuthenticated , (req, res) => {
    res.render('authentication/login', {layout : 'layouts/authentication-layout.ejs'})
})


router.post('/login', (req, res) => {
    res.redirect('/')
})

router.get('/lupa-password', checkNotAuthenticated, (req, res) => {
    res.render('authentication/lupa-password', {layout : 'layouts/authentication-layout.ejs'})
})

module.exports = router