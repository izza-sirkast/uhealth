const express = require('express')
const router = express.Router()
const passport = require('passport')

// Local libraries
const {checkNotAuthenticated} = require('../utils/authentication/passport-authentication.js')

router.get('/login', checkNotAuthenticated , (req, res) => {
    res.render('authentication/login', {layout : 'layouts/authentication-layout.ejs'})
})


router.post('/login', passport.authenticate('local', {
    successRedirect: '/mahasiswa',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.get('/lupa-password', checkNotAuthenticated, (req, res) => {
    res.render('authentication/lupa-password', {layout : 'layouts/authentication-layout.ejs'})
})

router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        res.redirect('/auth/login')
    })
})

module.exports = router