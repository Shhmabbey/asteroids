// Utility code, especially vector math stuff.
// You'll use a lot of vectors in this assignment.

// 2D vectors have an x and a y component.A position vector has an x and y position, while a velocity vector has a speed in the x and the y directions.

//   Distance
// To find the "distance" between two points, the formula is:

// // this is math, not JavaScript
// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
// Norm
// A vector has a norm, a.k.a., magnitude or length.The norm of a velocity vector is a speed.If obj.vel = [3, 4](3 horizontal pixels and 4 vertical pixels per unit time) then the overall speed is 5 pixels per unit time.You can easily calculate the norm of a vector using your distance function:

//   Norm([x_1, y_1]) = Dist([0, 0], [x_1, y_1])

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  inherits(ChildClass, BaseClass) {
    ChildClass.prototype = Object.create(BaseClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },
  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;