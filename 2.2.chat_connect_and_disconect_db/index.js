const express = require('express')
const app = express()
const port = process.env.PORT_ENV || 8080
const server = require('http').createServer(app)
const io = require('./src/socket')(server)

// routing
app.use(express.static(__dirname + '/public'));

//server listen
server.listen(port, () => {
  console.log('Server listening at port %d', port);
})

