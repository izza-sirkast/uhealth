const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mahasiswaModel = require('../../models/mahasiswa')
const dosenModel = require('../../models/dosen')
const dokterModel = require('../../models/dokter')

function passportSetup(passport){
    async function authenticateUser(req, ni, password, done){
        const loginAs = req.body.loginAs
        try{
            let user;
            if (loginAs == 'mahasiswa') {
                user = await mahasiswaModel.findOne({nim : ni})
            }else if(loginAs == 'dosen'){
                user = await dosenModel.findOne({nid : ni})
            }else if(loginAs == 'dokter'){
                user = await dokterModel.findOne({nidok : ni})
            }
            
            if (user == null) {
                return done(null, false, {message : 'Nomor induk atau password salah'})
            }else if(user.password === password){
                return done(null, {user, loginAs})
            }else{
                return done(null, false, {message : 'nomor induk or password salah'})
            }
        }catch(err){
            console.log(err)
            return done(err, false)
        }
    }

    
    passport.serializeUser(function(data, done) {
        process.nextTick(function() {
            done(null, {id: data.user._id, loginAs: data.loginAs})
        })
    })
    
    passport.deserializeUser(async function(data, done) {
        let user;
        if (data.loginAs == 'mahasiswa') {
            user = await mahasiswaModel.findById(data.id).populate('dosen_wali')
            user.loginAs = 'mahasiswa'
        }else if(data.loginAs == 'dosen'){
            user = await dosenModel.findById(data.id)
            user.loginAs = 'dosen'
        }else if(data.loginAs == 'dokter'){
            user = await dokterModel.findById(data.id)
            user.loginAs = 'dokter'
        }
        process.nextTick(function() {
            return done(null, user)
        })
    })

    passport.use(new LocalStrategy({usernameField : 'ni', passReqToCallback : true}, authenticateUser))
}

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        console.log('User belum terautentikasi')
        return res.redirect('/auth/login')
    }
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log('User sudah terautentikasi')
        return res.redirect('/mahasiswa')
    }
    return next()
}

// For checking if user is a mahasiswa
function checkIsMahasiswa(req,res,next){
    if(req.isAuthenticated() && req.user.loginAs == 'mahasiswa'){
        return next()
    }else if(!req.isAuthenticated()){
        console.log('User belum terautentikasi')
        res.redirect('/auth/login')
    }else{
        if(req.user.loginAs == 'dosen'){
            res.redirect('/dosen')
        }else if(req.user.loginAs == 'dokter'){
            res.redirect('/dokter')
        }
    }
}

// For checking if user is a dosen
function checkIsDosen(req,res,next){
    if(req.isAuthenticated() && req.user.loginAs == 'dosen'){
        return next()
    }else if(!req.isAuthenticated()){
        console.log('User belum terautentikasi')
        res.redirect('/auth/login')
    }else{
        if(req.user.loginAs == 'mahasiswa'){
            res.redirect('/mahasiswa')
        }else if(req.user.loginAs == 'dokter'){
            res.redirect('/dokter')
        }
    }
}

// For checking if user is a dokter
function checkIsDokter(req,res,next){
    if(req.isAuthenticated() && req.user.loginAs == 'dokter'){
        return next()
    }else if(!req.isAuthenticated()){
        console.log('User belum terautentikasid')
        res.redirect('/auth/login')
    }else{
        if(req.user.loginAs == 'mahasiswa'){
            res.redirect('/mahasiswa')
        }else if(req.user.loginAs == 'dosen'){
            res.redirect('/dosen')
        }
    }
}

module.exports = {passportSetup, checkAuthenticated, checkNotAuthenticated, checkIsMahasiswa, checkIsDosen, checkIsDokter}