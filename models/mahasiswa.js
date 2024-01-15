const mongoose = require('mongoose')

const mahasiswaSchema = mongoose.Schema({
    nim: {
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
    }
}, {collection : 'mahasiswa'})

const mahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema)

module.exports = mahasiswaModel