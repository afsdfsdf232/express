const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config')
const { User } = require('../model')
module.exports = async (req, res, next) => {
  // 获取token数据
  // 验证token是否有效
  // 无效 -》 401 
  // 有效 -》 读取用户信息并返回
  let token = req.headers['authorization']
  token = token
    ? token.split('Bearer')[1]
    : null
  if (!token) return res.status(401).end();
  try {
    token = token.trim()
    const decodeToken = await verify(token, jwtSecret)
    // 查找用户
    req.user = await User.findById(decodeToken.userId)
    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}
