const mongoose = require('mongoose')

const riwayatSchema = mongoose.Schema({
    mahasiswa: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mahasiswa'
    },
    tanggal: {
        type: Date,
        required: true
    },
    penyakit: {
        type: String,
        required: true
    },
    klinik: {
        type: String,
        required: true
    },
    pemeriksa: {
        type: String,
        required: true
    },
}, {collection : 'riwayat_pemeriksaan'})

const riwayatModel = mongoose.model('Riwayat_Pemeriksaan', riwayatSchema)

module.exports = riwayatModel