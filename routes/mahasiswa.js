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
        const riwayat_pemeriksaan = await riwayatModel.find({mahasiswa: req.user.id}).sort({tanggal: -1})
        res.render('mahasiswa/riwayat', {riwayat_pemeriksaan})
    }catch(err){
        console.log(err)
        res.redirect('/mahasiswa')
    }
})

router.get('/hasil', async (req, res) => {
    res.render('mahasiswa/hasil-fs')

})

module.exports = router;