const mongoose = require('mongoose')
const baseModel = require('./base-model')
// 用户的数据模型
const articleSchema = new mongoose.Schema({
  ...baseModel,
  userName: {
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
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  }
})

module.exports = articleSchema
