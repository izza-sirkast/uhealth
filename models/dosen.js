const mongoose = require('mongoose')

const dosenSchema = mongoose.Schema({
    nid: {
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
    kelas: {
        type: Array,
        required: true
    },
    tahun_masuk: {
        type: Date,
        required: true
    }
}, {collection : 'dosen'})

const dosenModel = mongoose.model('Dosen', dosenSchema)

module.exports = dosenModel