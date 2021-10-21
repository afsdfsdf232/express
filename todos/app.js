const express = require('express')
const fs = require('fs')
const app = express()

// 解析 application-json 数据
app.use(express.json())

// 解析表单请求 application/x-www-form-urlencoded
app.use(express.urlencoded())

const { getDb, saveDb } = require('./db')
app.get('/', (req, res) => {
  res.send('hello todos')
})
app.get('/todos', async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id
    const db = await getDb()
    const dbItem = db.todos.find(item => item.id.toString() === id) || {}
    res.status(200).json(dbItem)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})
app.post('/todos', async (req, res) => {
  try {
    const todo = req.body
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field title is required'
      })
    }
    const db = await getDb()
    const id = db.todos.length
    db.todos.push({
      title: todo.title,
      id
    })
    await saveDb(db)
    res.status(200).json({ ...todo, id })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }

})
app.patch('/todos', async (req, res) => {
  try {
    const { id, title } = req.body;
    if (!id && id !== 0) {
      return res.status(400).json({
        error: 'The field id is required'
      })
    }
    if (!title) {
      return res.status(400).json({
        error: 'The field title is required'
      })
    }
    const db = await getDb()
    const index = db.todos.findIndex(todo => todo.id === id)
    if (index === -1) {
      return res.status(400).json({
        error: '找不到该项内容'
      })
    }
    db.todos[index].title = title
    await saveDb(db)
    res.status(200).json({
      id,
      title
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }


})
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).json({
        error: 'The field id is required'
      })
    }
    const db = await getDb()
    const index = db.todos.findIndex(todo => todo.id.toString() === id)
    if (index === -1) {
      return res.status(400).json({
        error: '不存在该项内容'
      })
    }
    const todo = JSON.stringify(db.todos.find(todo => todo.id.toString() === id))
    db.todos.splice(index, 1)
    await saveDb(db)
    res.status(200).json(JSON.parse(todo))
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }

})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})

// p 11
