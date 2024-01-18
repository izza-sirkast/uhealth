const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('dokter/dashboard')
})

router.get('/riwayat-pemeriksaan', (req, res) => {
    res.render('dokter/riwayat-pemeriksaan')
})

router.get('/buat-surat-izin', (req, res) => {
    res.render('dokter/buat-surat-izin')
})


router.get('/jadwal-pemeriksaan', (req, res) => {
    res.render('dokter/jadwal-pemeriksaan')
})

module.exports = router;