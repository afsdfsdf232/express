const express = require('express')
const userCtrl = require('./../controller/user')
const userValidator = require('../validator/user')
const auth = require('../controller/auth')
const router = express.Router()

// 用户登陆
router.post('/users/login', userValidator.login, userCtrl.login)

// 用户注册
router.post('/users', userValidator.register, userCtrl.register)

// 获取当前登陆用户
router.get('/user',auth, userCtrl.getCurrentUser)

// 更新当前登陆用户
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router
