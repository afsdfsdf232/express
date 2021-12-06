const express = require('express')
const userCtrl = require('./../controller/user')
const userValidator = require('../validator/user')
const auth = require('../controller/auth')
const router = express.Router()

router.get('/login', userCtrl.showLogin)
router.post('/login', userValidator.login, userCtrl.login)
router.get('/register', userCtrl.showRegister)
router.get('/logOut', userCtrl.logOut)
router.post('/register', userValidator.register, userCtrl.register)
router.get('/settings', userCtrl.showSettings)
router.get('/profile/:username', userCtrl.showProfile)
router.get('/profile/:username/favorites', userCtrl.showProfile)

module.exports = router