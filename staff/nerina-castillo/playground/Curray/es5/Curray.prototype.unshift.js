var Curray = require("./Curray");

Curray.prototype.unshift = function () {
  var originalLength = this.length;
  for (var i = this.length; i >= 0; i--) {
    this[i + arguments.length] = this[i];
  }
  for (var i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }

  this.length = originalLength + arguments.length;
  return this.length;
};
