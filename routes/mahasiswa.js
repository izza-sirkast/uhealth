const express = require('express');
const router = express.Router();

// data models
const mahasiswaModel = require('../models/mahasiswa')
const dosenModel = require('../models/dosen')
const dokterModel = require('../models/dokter')
const riwayatModel = require('../models/riwayat_pemeriksaan')

router.get('/', (req, res) => {
    res.render('mahasiswa/dashboard')
})

router.get('/feeling-sick', (req, res) => {
    res.render('mahasiswa/feeling-sick')
})

router.get('/izin-sakit', (req, res) => {
    res.render('mahasiswa/izin-sakit')
})

router.get('/riwayat', async (req, res) => {
    try{
        const mahasiswa = await mahasiswaModel.find().populate('dosen_wali')
        const dosen = await dosenModel.find()
        const dokter = await dokterModel.find()
        const riwayat = await riwayatModel.find().populate('mahasiswa')
        console.log(mahasiswa)
        console.log(dosen)
        console.log(dokter)
        console.log(riwayat)
        res.render('mahasiswa/riwayat')
    }catch(err){
        console.log(err)
        res.redirect('/mahasiswa')
    }
})

router.get('/hasil', async (req, res) => {
    res.render('mahasiswa/hasil-fs')

})

module.exports = router;