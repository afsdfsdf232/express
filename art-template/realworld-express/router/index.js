const express = require('express')
const router = express.Router()
router.get('/',(req,res)=> {
  res.render('index')
})
router.get('/login',(req,res)=> {
  res.render('login',{
    isLogin: true
  })
})
router.get('/register',(req,res)=> {
  res.render('login',{
    isLogin: false
  })
})
// router.use(require('./user'))
// router.use('/article', require('./article'))
// router.use('/profiles', require('./profile'))
module.exports = router
