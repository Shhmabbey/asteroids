/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// // Spacerock.It inherits from MovingObject.\n// const Util = require(\"./utils\");\n// const MovingObject = require(\"./moving_object\");\n\n// const DEFAULTS = {\n//   COLOR: \"#FFC0CB\",\n//   RADIUS: 25,\n//   SPEED: 4\n// };\n\n// class Asteroid extends MovingObject {\n//   constructor(options) {\n//     super(options);\n//     this.color = DEFAULTS.COLOR;\n//     this.radius = DEFAULTS.RADIUS;\n//     this.speed = DEFAULTS.SPEED;\n//     this.pos = options.pos || options.game.randomPosition();\n//     this.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n//   };\n\n// };\n\n// module.exports = Asteroid;\n\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 25,\n  SPEED: 4\n};\n\nfunction Asteroid(options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n\n  MovingObject.call(this, options);\n}\n\n// Must inherit before adding any properties (usually functions) to the Asteroid prototype\nUtil.inherits(Asteroid, MovingObject);\n\n// Asteroid.prototype.collideWith = function collideWith(otherObject) {\n//   if (otherObject instanceof Ship) {\n//     otherObject.relocate();\n//     return true;\n//   } else if (otherObject instanceof Bullet) {\n//     this.remove();\n//     otherObject.remove();\n//     return true;\n//   }\n//   return false;\n// };\n\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack://asteroids/./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ (() => {

eval("// Kill spacerocks with this.Also a MovingObject subclass.\n\n//# sourceURL=webpack://asteroids/./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Holds collections of the asteroids, bullets, and your ship.\n//   Game.prototype.step method calls Game.prototype.move on all the objects,\n//  and Game.prototype.checkCollisions checks for colliding objects.\n//     Game.prototype.draw(ctx) draws the game.\n// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.\n\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nconst DEFAULTS = {\n  BG_COLOR: \"#000000\",\n  DIM_X: 1000,\n  DIM_Y: 600,\n  FPS: 32,\n  NUM_ASTEROIDS: 10\n}\n\nclass Game {\n  constructor() {\n    this.asteroids = [];\n    this.bullets = [];\n    this.ships = [];\n  \n    this.addAsteroids();\n  }\n\n  randomPosition() {\n    return [\n      DEFAULTS.DIM_X * Math.random(),\n      DEFAULTS.DIM_Y * Math.random()\n    ];\n  };\n\n  add(object) {\n    if (object instanceof Asteroid) {\n      this.asteroids.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    };\n  };\n\n  addAsteroids() {\n    for (let i = 0; i < DEFAULTS.NUM_ASTEROIDS; i++) {\n      this.add(new Asteroid({ game: this }));\n    };\n  };\n\n  allObjects() {\n    return [].concat(this.ships, this.asteroids, this.bullets);\n  };\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);\n    ctx.fillStyle = DEFAULTS.BG_COLOR;\n    ctx.fillRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);\n\n    this.allObjects().forEach((object) => {\n      object.draw(ctx);\n    });\n  };\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n    });\n  };\n\n  step(delta) {\n    this.moveObjects(delta);\n    // this.checkCollisions();\n  };\n\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://asteroids/./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module) => {

eval("// Stores a Game instance.\n// Stores a canvas context to draw the game into.\n// Installs key listeners to move the ship and fire bullets.\n// Installs a timer to call Game.prototype.step.\n\nMOVES = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0]\n};\n\nclass GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    // this.ship = this.game.addShip();\n  }\n\n  // bindKeyHandlers() {\n  //   const ship = this.ship;\n\n  //   Object.keys(GameView.MOVES).forEach((k) => {\n  //     const move = GameView.MOVES[k];\n  //     key(k, function () { ship.power(move); });\n  //   });\n\n  //   key(\"space\", () => { ship.fireBullet(); });\n  // };\n\n  start() {\n    // this.bindKeyHandlers();\n    this.lastTime = 0;\n    // start the animation // initial animation call\n    requestAnimationFrame(this.animate.bind(this));\n  };\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n\n    // Installs a timer to call Game.prototype.step.\n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n\n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n  };\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://asteroids/./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nconst canvas = document.getElementById('game-canvas');\nconst ctx = canvas.getContext('2d');\n\nlet game = new Game();\nnew GameView(game, ctx).start();\n\n\n//# sourceURL=webpack://asteroids/./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// // Base class for anything that moves.\n// // Most important methods are \n//   // MovingObject.prototype.move, \n//   // MovingObject.prototype.draw(ctx), and \n//   // MovingObject.prototype.isCollidedWith(otherMovingObject).\n\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\n// MovingObject.prototype.collideWith = function collideWith(otherObject) {\n//   // default do nothing\n// };\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n};\n\n// MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n//   const centerDist = Util.dist(this.pos, otherObject.pos);\n//   return centerDist < (this.radius + otherObject.radius);\n// };\n\n// MovingObject.prototype.isWrappable = true;\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nMovingObject.prototype.move = function move(timeDelta) {\n  // timeDelta is number of milliseconds since last move\n  // if the computer is busy the time delta will be larger\n  // in this case the MovingObject should move farther in this frame\n  // velocity of object is how far it should move in 1/60th of a second\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n  // if (this.game.isOutOfBounds(this.pos)) {\n  //   if (this.isWrappable) {\n  //     this.pos = this.game.wrap(this.pos);\n  //   } else {\n  //     this.remove();\n  //   }\n  // }\n};\n\n// MovingObject.prototype.remove = function remove() {\n//   this.game.remove(this);\n// };\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack://asteroids/./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ (() => {

eval("// This is you! Another MovingObject subclass.\n\n//# sourceURL=webpack://asteroids/./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// Utility code, especially vector math stuff.\n// You'll use a lot of vectors in this assignment.\n\n// 2D vectors have an x and a y component.A position vector has an x and y position, while a velocity vector has a speed in the x and the y directions.\n\n//   Distance\n// To find the \"distance\" between two points, the formula is:\n\n// // this is math, not JavaScript\n// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)\n// Norm\n// A vector has a norm, a.k.a., magnitude or length.The norm of a velocity vector is a speed.If obj.vel = [3, 4](3 horizontal pixels and 4 vertical pixels per unit time) then the overall speed is 5 pixels per unit time.You can easily calculate the norm of a vector using your distance function:\n\n//   Norm([x_1, y_1]) = Dist([0, 0], [x_1, y_1])\n\nconst Util = {\n  // Normalize the length of the vector to 1, maintaining direction.\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  // Find the length of the vector.\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://asteroids/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;