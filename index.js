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
  console.log('8080s and chilly toes. Listening on ' + server.address().port)
})

server.lastPlayerID = 0

io.on('connection', (socket) => {
  console.log('online')
  socket.on('newplayer', () => {
    socket.player = {
      id: server.lastPlayerID++,
      radius: randomInt(10, 50),
      color: 'green',
      x: randomInt(50, 430),
      y: randomInt(50, 220)
    }
    console.log('test')
    console.log(socket.player)
    socket.emit('allplayers', getAllPlayers())
    socket.broadcast.emit('newplayer', socket.player)

    socket.on('click', (data) => {
      console.log('click to ' + data.x + ', ' + data.y)
      socket.player.x = data.x
      socket.player.y = data.y
      io.emit('move', socket.player)
    })
  })
})

function getAllPlayers () {
  var players = []
  Object.keys(io.sockets.connected).forEach((socketID) => {
    var player = io.sockets.connected[socketID].player
    console.log('player', player)
    if (player) players.push(player)
    console.log('players', players)
  })
  return players
}

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
