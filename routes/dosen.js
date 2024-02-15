const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('dosen/dashboard')
})

router.get('/feeling-sick', (req, res) => {
    res.render('dosen/feeling-sick')
})

router.get('/surat-izin', (req, res) => {
    res.render('dosen/cek-surat-izin')
})


router.get('/kesehatan-mahasiswa', (req, res) => {
    res.render('dosen/kesehatan-mahasiswa')
})

router.get('/hasil', async (req, res) => {
    res.render('mahasiswa/hasil-fs')
})

module.exports = router;