const express = require('express')
const { body, validationResult } = require('express-validator')
const userCtrl = require('./../controller/user')
const { User } = require('../model')
const router = express.Router()

// 用户登陆
router.post('/users/login', userCtrl.login)

// 用户注册
router.post('/users', [ // 配置验证规则
  body('user.username').notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom( async username => {
      const user = await User.findOne({username})
      if (user) {
       return Promise.reject('用户名已存在')
      }
    })
    ,
  body('user.password').notEmpty().withMessage('用户密码不能为空'),
  body('user.email').notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail() // 前面验证通过才会执行该项后面的验证
    .custom( async email => { // 自定义验证规则，邮箱不能重复
     const user = await User.findOne({email})
     if (user) {
       return Promise.reject('邮箱已存在')
     }
    })
], (req, res, next) => { // 判断验证结果
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}, userCtrl.register)

// 获取当前登陆用户
router.get('/user', userCtrl.getCurrentUser)

// 更新当前登陆用户
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router
