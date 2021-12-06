const { Article } = require('../model')
exports.showIndex = async(req, res, next) => {
    try {
        const articles = await Article.find()
        res.render('index', {
            articles
        })
    } catch (err) {
        next(err)
    }
}

exports.showEditor = async(req, res, next) => {
    try {
        res.render('editor')
    } catch (err) {
        next(err)
    }
}

exports.showArticle = async(req, res, next) => {
    try {
        res.render('article')
    } catch (err) {
        next(err)
    }
}

exports.createArticle = async(req, res, next) => {
    try {
        // 处理请求
        const article = new Article(req.body.article)
        await article.save()
        res.status(201).json({ article: article })
    } catch (err) {
        next(err)
    }
}