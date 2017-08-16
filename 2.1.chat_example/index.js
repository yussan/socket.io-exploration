const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log('Server is listening on port : ', port)
})

// routing 
app.use(express.static(__dirname + '/public'))

// chat room
let numUsers = 0

io.on('connection', (socket) => {
  
  // when client emits 'new message', listen and execute
  socket.on('new message', (data) => {
    // tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    })
  })

  // when the client emits 'add user', listen and execute
  socket.on('add user', (username) => {
    if(addedUser) return 
    socket.username = username
    ++numUsers
    addedUser = true 
    socket.emit('login', {numUsers})
    //broadcast to all logged in user (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers
    })
  })

  // when client emits 'typing', broacast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })

  // when client emits 'stop typing', broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    })
  })

  //when the user disconnects.. perform utils
  socket.on('disconnect', () => {
    if(addedUser)
    {
      --numUsers
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers
      })
    }
  })
})

