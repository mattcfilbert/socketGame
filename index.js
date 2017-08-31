var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(8080, () => {
  console.log('8080s and chilly toes. Listening on ' +server.address().port)
})

server.lastPlayerID = 0

io.on('connection', (socket) => {
  socket.on('newplayer', () => {
    socket.player = {
      id: server.lastPlayerID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    }
    socket.emit('allplayers', getAllPlayers())
    socket.broadcast.emit('newplayer', socket.player)
  })
})

function getAllPlayers () {
  var players = []
  Object.keys(io.sockets.connected).forEach((socketID) => {
    var player = io.sockets.connected[socketID].player
    if(player) players.push(player)
  })
  return players
}

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
