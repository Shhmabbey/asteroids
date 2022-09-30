// Holds collections of the asteroids, bullets, and your ship.
//   Game.prototype.step method calls Game.prototype.move on all the objects,
//  and Game.prototype.checkCollisions checks for colliding objects.
//     Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.

const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Util = require("./utils");

const DEFAULTS = {
  BG_COLOR: "#000000",
  DIM_X: 1000,
  DIM_Y: 600,
  FPS: 32,
  NUM_ASTEROIDS: 10
}

class Game {
  constructor() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
  
    this.addAsteroids();
  }

  randomPosition() {
    return [
      DEFAULTS.DIM_X * Math.random(),
      DEFAULTS.DIM_Y * Math.random()
    ];
  };

  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else {
      throw new Error("unknown type of object");
    };
  };

  addAsteroids() {
    for (let i = 0; i < DEFAULTS.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    };
  };

  allObjects() {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  draw(ctx) {
    ctx.clearRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);
    ctx.fillStyle = DEFAULTS.BG_COLOR;
    ctx.fillRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  };

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  };

  step(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
  };

};

module.exports = Game;
