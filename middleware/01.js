const express = require('express')
const app = express()
app.use((req, res, next)=> {
  console.log(req.method, req.url, Date.now())
  next()
})
app.get('/',(req,res)=> {
  res.send('get /')
})

app.post('/login',(req, res)=> {
  res.send('post /login')
})


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})

// p16
