var Curray = require("./Curray");

Curray.prototype.shift = function () {
  var element = this[0];
  for (i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }

  delete this[this.length - 1];
  this.length--;
  return element;
};
