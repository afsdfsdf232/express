const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')
// 用户的数据模型
const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value), // 密码需要加密
    select: false // 不返回给用户
  },
  bio: { // 个人介绍
    type: String,
    default: null
  },
  image: {  // 用户头像
    type: String,
    default: null
  }
})

module.exports = userSchema
