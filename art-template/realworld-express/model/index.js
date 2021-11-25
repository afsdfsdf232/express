const mongoose = require('mongoose')
// 启动命令 cmd
// mongod --dbpath="D:\ProTools\mongodb-win32-x86_64-windows-5.0.2\data"
// 连接数据库
mongoose.connect('mongodb://localhost:27017/realworld',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', err => {
  console.log('数据库连接失败：', err)
})
db.once('open', ()=> {
  console.log('数据库连接成功')
})

// 组合模型
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}
