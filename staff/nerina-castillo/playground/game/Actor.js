function Actor(container, width, height) {
  this.container = container;

  this.setX(0);
  this.setY(0);

  this.w = width;
  this.h = height;

  this.container.style.width = this.w + "px";
  this.container.style.height = this.h + "px";
}

Actor.prototype.getXMax = function () {
  return this.x + this.w;
};

Actor.prototype.getYMax = function () {
  return this.y + this.h;
};

Actor.prototype.setX = function (x) {
  this.x = x;

  this.container.style.left = this.x + "px";
};

Actor.prototype.setY = function (y) {
  this.y = y;

  this.container.style.top = this.y + "px";
};

Actor.prototype.moveX = function (dx) {
  this.setX(this.x + dx);
};

Actor.prototype.moveY = function (dy) {
  this.setY(this.y + dy);
};

Actor.prototype.setColor = function (color) {
  this.container.style.backgroundColor = color;
};
