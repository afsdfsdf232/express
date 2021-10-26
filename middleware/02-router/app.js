const express = require('express')
const app = express()
const router = require('./router')
// 解析 application-json 数据
app.use(express.json())

// 解析表单请求 application/x-www-form-urlencoded
app.use(express.urlencoded())


app.get('/', (req, res) => {
  res.send('hello todos')
})
 
app.use('/todos',router) // 第一个参数添加访问前缀

// 404 处理
app.use((req, res, next)=> {
  res.status(404).send('404 Not Found .')
})

app.use((err, req, res, next) => { // 错误处理中间件，4个参数，缺一不可
  res.status(500).json({
    error: err.message
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
