const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('dashboard-mahasiswa/main')
})

router.get('/feeling-sick', (req, res) => {
    res.render('dashboard-mahasiswa/feeling-sick')
})

router.get('/izin-sakit', (req, res) => {
    res.render('dashboard-mahasiswa/izin-sakit')
})

router.get('/riwayat', (req, res) => {
    res.render('dashboard-mahasiswa/riwayat')
})

module.exports = router;