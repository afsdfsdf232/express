const { Article } = require('../model')

exports.getArticles = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, tag } = req.query
    const filter = {}
    // tag 筛选
    if (tag) {
      filter.tagList = tag
    }
    const articles = await Article.find(filter)
              .skip(Number(offset)) // 跳过多少条, 需要将字符串转为number否则不生效
              .limit(Number(limit)) // 每页条数, 需要将字符串转为number否则不生效
              .sort({ // 排序 1：正序 -1 倒序
                createdAt: -1
              })
              .populate('author')
    const articleCount = await Article.countDocuments()
    res.status(200).json({
      articles,
      articleCount
    })
  } catch(err) {
    next(err)
  }
  
}
exports.getFeedArticles = (req, res, next)=> {
  
}
// 获取单个文章
exports.getArticle = async (req, res, next)=> {
  try {
    const article = await Article.findById(req.params.articleId).populate('author')
    if (!article) {
      return res.status(404).end()
    }
    return res.status(200).json({article})
  } catch(err) {
    next(err)
  }
}
// 创建文章
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
exports.updateArticle  = async (req, res, next) => {
  try {
    const article = req.article
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title;
    article.description = bodyArticle.description || article.description;
    article.body = bodyArticle.body || article.body;
    await article.save()
    res.status(200).json({article})
  }catch(err) {
    next(err)
  }
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
