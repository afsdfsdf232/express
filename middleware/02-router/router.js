const express = require('express')
const router = express.Router()
const { getDb, saveDb } = require('./db')
router.get('/', async (req, res, next) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (err) {
    next(err)
    // next()  往后匹配下一个中间件
    // next('router') 往后匹配当前中间件堆栈中的下一个
    // next('其他参数') 跳过所有剩余的无错误处理路由和中间件函数
    // res.status(500).json({
    //   error: err.message
    // })
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const db = await getDb()
    const dbItem = db.todos.find(item => item.id.toString() === id) || {}
    res.status(200).json(dbItem)
  } catch (err) {
    // res.status(500).json({
    //   error: err.message
    // })
    next(err)
  }
})
router.post('/', async (req, res, next) => {
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
    next(err)
    // res.status(500).json({
    //   error: err.message
    // })
  }

})
router.patch('/', async (req, res, next) => {
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
    next(err)
    // res.status(500).json({
    //   error: err.message
    // })
  }


})
router.delete('/:id', async (req, res, next) => {
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
    next(err)
    // res.status(500).json({
    //   error: err.message
    // })
  }

})



module.exports = router
