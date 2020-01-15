const express = require('express')
const db = require('./data/hubs-model')

const server = express()

server.listen(4000, () => {
  console.log("listening port 4000")
})

//global middleware
server.use(express.json())

server.get("/", (req, res) => {
  res.send('hello world')
})

server.get('/now', (req, res) => {
  res.send(new Date().toISOString())
})

//CRUD
// Create - POST
// Read - GET
// update - PUT
// delete - DELETE

server.get('/hubs', (req, res) => {
  db.find()
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(err => {
    res.status(500).json({success: false, err})
  })
})

server.post('/hubs', (req, res) => {
  const hubinfo = req.body

  db.add(hubinfo)
  .then(hub => {
    res.status(201).json({success:true, hub})
  })
  .catch(err => {
    res.status(500).json({success: false, err})
  })
})

server.delete('/hubs/:id', (req, res) => {
  const {id} = req.params

  db.remove(id)
  .then(deleted=> {
    deleted ? res.status(204).end() : res.status(404).json({success: false, message: "ID not found"})
  })
  .catch(err => {
    res.status(500).json({success: false, err})
  })
})

server.put('/hubs/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  db.update(id, changes)
    .then(updated => {
      res.status(200).json({success: true, updated})
    })
    .catch(err => {
      res.status(500).json({success: false, err})
    })
})