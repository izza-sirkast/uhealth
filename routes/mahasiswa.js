const express = require('express')
const router = express.Router()
const mahasiswaModel = require('../models/mahasiswa')

router.get('/', async (req, res) => {
    try{
        const mahasiswa = await mahasiswaModel.find()
        res.render('mahasiswa', {mahasiswa})
    }catch(err){
        res.redirect('/')
    }
})

module.exports = router