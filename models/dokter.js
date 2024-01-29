const mongoose = require('mongoose')

const dokterSchema = mongoose.Schema({
    nidok: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tahun_masuk: {
        type: Date,
        required: true
    }
}, {collection : 'dokter'})

const dokterModel = mongoose.model('Dokter', dokterSchema)

module.exports = dokterModel