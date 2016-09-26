'use strict'

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo'
const port = process.env.PORT || 3000

// middlewares
app.use(express.static('client'))
app.use(json())
//

app.get('/api/title', (req, res) =>
  res.json({ title: 'TODO APP' })
)

const Todo = mongoose.model('todo', {
  title: String,
  content: String,
})

app.get('/api/todos', (req, res, err) =>
  Todo
    .find()
    .then(todos => res.json({ todos }))
    .catch(err)
)

app.post('/api/todos', (req, res, err) => {
  const todo = req.body
  Todo
    .create(todo)
    .then(todo => res.json(todo))
    .catch(err)
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(port, () => console.log(`Listening on port: ${port}`))
)
