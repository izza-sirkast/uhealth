const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('authentication/login', {layout : 'layouts/authentication-layout.ejs'})
})


router.post('/login', (req, res) => {
    res.redirect('/')
})

router.get('/lupa-password', (req, res) => {
    res.render('authentication/lupa-password', {layout : 'layouts/authentication-layout.ejs'})
})

module.exports = router