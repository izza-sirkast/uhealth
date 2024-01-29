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
    },
    kelas: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    program_studi: {
        type: String,
        required: true
    },
    tahun_masuk: {
        type: Date,
        required: true
    },
    dosen_wali: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dosen'
    }
}, {collection : 'mahasiswa'})

const mahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema)

module.exports = mahasiswaModel