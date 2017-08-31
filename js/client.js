var Client = {}

Client.socket = io.connect()

Client.askNewPlayer = () => {
  Client.socket.emit('newplayer')
}

Client.socket.on('newplayer', (data) => {
  Game.addNewPlayer(data.id, data.x, data.y)
})

Client.socket.on('allplayers', (data) => {
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    Game.addNewPlayer(data[i].id, data[i].x, data[i].y)
  }
})
