const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 5000
const app = express()

// 解析请求体中间件
app.use(express.json())
app.use(express.urlencoded())

// 日志输出中间件
app.use(morgan('dev'))

// 跨域处理中间件
app.use(cors())

app.use('/api', router)

app.use(errorHandler())
app.listen(PORT, ()=> {
  console.log(`Server is running at http://localhost:${PORT}`)
})

// p9
