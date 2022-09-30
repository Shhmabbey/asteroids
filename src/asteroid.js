// // Spacerock.It inherits from MovingObject.
// const Util = require("./utils");
// const MovingObject = require("./moving_object");

// const DEFAULTS = {
//   COLOR: "#FFC0CB",
//   RADIUS: 25,
//   SPEED: 4
// };

// class Asteroid extends MovingObject {
//   constructor(options) {
//     super(options);
//     this.color = DEFAULTS.COLOR;
//     this.radius = DEFAULTS.RADIUS;
//     this.speed = DEFAULTS.SPEED;
//     this.pos = options.pos || options.game.randomPosition();
//     this.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
//   };

// };

// module.exports = Asteroid;

const Util = require("./utils");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

function Asteroid(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
}

// Must inherit before adding any properties (usually functions) to the Asteroid prototype
Util.inherits(Asteroid, MovingObject);

// Asteroid.prototype.collideWith = function collideWith(otherObject) {
//   if (otherObject instanceof Ship) {
//     otherObject.relocate();
//     return true;
//   } else if (otherObject instanceof Bullet) {
//     this.remove();
//     otherObject.remove();
//     return true;
//   }
//   return false;
// };


module.exports = Asteroid;
