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
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Ship) {
      this.ships.push(object);
    } else {
      throw new Error("unknown type of object");
    };
  };

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
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
    this.checkCollisions();
  };

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  };

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  };

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    };
  };

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

};

module.exports = Game;
