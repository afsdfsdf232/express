const mongoose = require('mongoose')
const baseModel = require('./base-model')
const Schema = mongoose.Schema
// 用户的数据模型
const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: String,
    default: null
  },
  favoritesCount: { // 点赞数量
    type: Number,
    default: 0
  },
  author: { // 会存入查询的用户id
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = articleSchema
