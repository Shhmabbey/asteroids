// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.



class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.moves = {
      w: [0, -1],
      a: [-1, 0],
      s: [0, 1],
      d: [1, 0]
    };
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(this.moves).forEach((k) => {
      const move = this.moves[k];
      key(k, function () { ship.power(move); });
    });

    key("space", () => { ship.fireBullet(); });
  };

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation // initial animation call
    requestAnimationFrame(this.animate.bind(this));
  };

  animate(time) {
    const timeDelta = time - this.lastTime;

    // Installs a timer to call Game.prototype.step.
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
};

module.exports = GameView;