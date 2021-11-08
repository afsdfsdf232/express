const mongoose = require('mongoose')
const baseModel = require('./base-model')
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
    required: true
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
