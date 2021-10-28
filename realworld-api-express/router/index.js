const express = require('express')
const router = express.Router()
router.get('/',(req,res)=> {
  res.send('hello word')
})
router.use(require('./user'))
router.use('/profiles', require('./profile'))
module.exports = router
