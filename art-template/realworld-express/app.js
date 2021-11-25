const express = require('express')
const path = require('path')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const router = require('./router/index')
const PORT = process.env.PORT || 3000
const app = express()
// 设置静态资源
app.use('/public', express.static(path.join(__dirname,'./public')))
app.use('/node_modules', express.static(path.join(__dirname, './../../node_modules')))
// 配置模板引擎
app.engine('html', require('express-art-template')) // 以html文件结尾的用该模板渲染 
app.set('view options',{
  debug: process.env.NODE_ENV !== 'production'
})
app.set('views', path.join(__dirname,'views')) // 模板目录
app.set('view engine', 'html') // 可以省略的模板文件后缀
// 解析请求体中间件
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// 日志输出中间件
app.use(morgan('dev'))

app.use('/', router)


require('./model')
// 统一错误处理中间件
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}
app.listen(PORT, ()=> {
  console.log(`Server is running at http://localhost:${PORT}`)
})

// p13
