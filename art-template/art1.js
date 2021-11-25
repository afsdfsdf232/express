const express = require('express')
const path = require('path')
const template = require('art-template')
const app = express()

// view engine setup
app.engine('art',require('express-art-template'))
app.set('view options',{
  debug: process.env.NODE_ENV !== 'production'
})

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'art')

const todos = [
  { id: 1, title:'吃饭1' },
  { id: 2, title:'吃饭2' },
  { id: 3, title:'吃饭3' },
  { id: 4, title:'吃饭4' }
]
app.get('/',(req,res)=> {
  res.render('index')
})


app.listen(3000, ()=> {
  console.log('3000 端口启动成功')
})
