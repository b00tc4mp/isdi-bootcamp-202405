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

Actor.prototype.gtYMax = function () {
  return this.y + this.h;
};

Actor.prototype.setX = function () {
  this.x = this.x;

  this.container.style.left = this.x + "px";
};

Actor.prototype.setY = function () {
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

var actor1 = new Actor(document.getElementById("bos-1"), 40, 80);
var actor2 = new Actor(document.getElementById("box-2"), 70, 40);

actor1.setColor("red");
actor2.setColor("dodgerblue");

actor1.setX(120);
actor1.setY(100);

actor2.setX(200);
actor2.setY(200);

var STEP = 10;

document.onkeydown = function (event) {
  if (event.key === "ArrowRight") actor1.moveX(STEP);
  else if (event.key === "ArrowLeft") actor1.moveX(-STEP);
  else if (event.key === "ArrowDown") actor1.moveY(STEP);
  else if (event.key === "ArrowUp") actor2.moveY(-STEP);

  if (event.key === "d") actor2.moveX(STEP);
  else if (event.key === "a") actor2.moveX(-STEP);
  else if (event.key === "s") actor2.moveY(STEP);
  else if (event.key === "w") actor2.moveY(-STEP);

  if (
    actor1.x <= actor2.getXMax() &&
    actor1.y <= actor2.getYMax() &&
    actor1.getXMax() >= actor2.x &&
    actor1.getYMax() >= actor2.y
  )
    console.count("intersecting");
};
