const express = require('express')
const articleCtrl = require('../controller/article')
const auth = require('../controller/auth')
const articleValidator = require('../validator/article')
const router = express.Router()
router.get('/',articleCtrl.showIndex)
router.get('/editor', articleCtrl.showEditor)
router.get('/editor/:editorId', articleCtrl.showEditor)
router.get('/article/:articleId',articleCtrl.showArticle)


module.exports = router
