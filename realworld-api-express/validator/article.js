const { body,param } = require('express-validator')
const mongoose = require('mongoose')
const validate = require('../middleware/validata')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.description').notEmpty().withMessage('文章摘要不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
  param('articleId').custom(value => {
    if (!mongoose.isValidObjectId(value)) {
      throw Error('文章ID不正确')
    }
    return true
  })
])
