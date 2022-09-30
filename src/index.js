const GameView = require('./game_view');
const Game = require('./game');

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let game = new Game();
new GameView(game, ctx).start();
