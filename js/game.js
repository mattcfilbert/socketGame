var game = new Phaser.Game(24 * 32, 17 * 32, Phaser.AUTO, document.getElementById('game'))


var Game = {}

Game.init = () => {
  game.stage.disableVisibilityChange = true
}

Game.preload = () => {
  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32)
  game.load.image('sprite', 'assets/sprites/sprite.png')
}

Game.create = () => {
  Game.playerMap = {}
  var map = game.add.tilemap('map')
  map.addTilesetImage('tilesheet', 'tileset') // tilesheet is the key of the tileset in map's JSON file
  var layer
  for (var i = 0; i < map.layers.length; i++) {
    layer = map.createLayer(i)
  }
  layer.inputEnabled = true // Allows clicking on the map
  Client.askNewPlayer()
}

Game.addNewPlayer = (id, x, y) => {
  Game.playerMap[id] = game.add.sprite(x, y, 'sprite')
}

game.state.add('Game', Game)
game.state.start('Game')
