const { Article } = require('../model')

exports.getArticles = (req, res, next) => {
  
}
exports.getFeedArticles = (req, res, next)=> {
  
}
exports.getArticle = (req, res, next)=> {
  
}
exports.createArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = new Article(req.body.article)
    article.author = req.user._id
    await article.save()
    // 映射作者信息
    const articleEnd = await article.populate('author');
    res.status(201).json({article: articleEnd})
  } catch(err) {
    next(err)
  }
}
exports.updateArticle  = (req, res, next) => {
  
}
exports.deleteArticle = (req, res, next) => {
  
} 
exports.createArticleComment = (req, res, next) => {
  
} 
exports.createArticleComment  = (req, res, next) => {
  
}
exports.getArticleComments = (req, res,next) => {
  
}
exports.deleteArticleComment = (req, res, next) => {
  
}
