const { body } = require('express-validator')
const { User } = require('../model')
const validate = require('../middleware/validata')
const md5 = require('../util/md5')
exports.register = validate([ // 配置验证规则
  body('user.username').notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    })
  ,
  body('user.password').notEmpty().withMessage('用户密码不能为空'),
  body('user.email').notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail() // 前面验证通过才会执行该项后面的验证
    .custom(async email => { // 自定义验证规则，邮箱不能重复
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    })
])
exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async email => {
      const user = await User.findOne({ email })
      if (!user) return Promise.reject('用户不存在')
    }),
    body('user.password').custom(async (password,{req}) => {
      const user = await User.findOne({ password: password }).select(['password','username','bio','image','email'])
      console.log('user:', user)
      if (user.password !== md5(password)){
        return Promise.reject('密码错误')
      }
      req.user = user
    })
  ])
]
