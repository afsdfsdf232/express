const express = require('express')
const app = express()

app.get('/',(req,res) => {
  res.send('hell word')
})

app.listen(3000,()=> {
  console.log('3000 端口启动成功')
})
// p7
