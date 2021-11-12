const { User } = require('../model')
const { jwtSecret } = require('../config/config')
const jwt = require('../util/jwt')
// 用户登陆
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id
    }, jwtSecret)
    res.status(200).json({ user, token })

  } catch (err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 验证数据，保存到数据库
    let user = new User(req.body.user)

    //  保存到数据库
    await user.save()
    user = JSON.parse(JSON.stringify(user))
    delete user.password
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}

// 获取当前用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send('get / user')
  } catch (err) {
    next(err)
  }
}

// 更新当前用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('put / user')
  } catch (err) {
    next(err)
  }
}
