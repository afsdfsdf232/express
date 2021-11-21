const { body, param } = require('express-validator')
const mongoose = require('mongoose')
const { Article } = require('../model')
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

exports.updateArticle = [
  validate([
    validate.isValidObjectId(["params"], 'articleId')
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    if (!article) {
      return res.status(404).end()
    }
    req.article = article
    next()
  },
  // 没有权限
  async (req, res, next) => {
    if (req.article.author) {
      if (req.user._id.toString() !== req.article.author.toString()) {
        return res.status(403).end()
      }
    }

    next()
  }
]

exports.deleteArticle = exports.updateArticle
