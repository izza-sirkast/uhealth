const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mahasiswa/dashboard')
})

router.get('/feeling-sick', (req, res) => {
    res.render('mahasiswa/feeling-sick')
})

router.get('/izin-sakit', (req, res) => {
    res.render('mahasiswa/izin-sakit')
})

router.get('/riwayat', (req, res) => {
    res.render('mahasiswa/riwayat')
})

module.exports = router;