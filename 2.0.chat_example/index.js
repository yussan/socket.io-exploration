const express = require('express')
const app = express()
const http = require('http').Server(app) 

const server = app.listen(3000, () => {
  console.log('listenting on port', 3000)
})
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.get('/socket.io', (req, res) => {
  res.json({})
})
app.use('/public', express.static('public'))

// broadcaster
io.emit('some event', {for: 'everyone'})

io.on('connection', (socket) =>{
  // broadcast
  socket.broadcast.emit('hi')
  // receiver
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})
