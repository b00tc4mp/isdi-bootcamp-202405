var Curray = require("./Curray");

Curray.prototype.unshift = function (element) {
  for (var i = this.length; i > 0; i--) {
    this[i] = this[i - 1];
  }

  this.length++;

  this[0] = element;

  return this.length;
};
