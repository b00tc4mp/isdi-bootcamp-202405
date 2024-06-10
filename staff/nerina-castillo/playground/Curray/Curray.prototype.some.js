var Curray = require("./Curray");

Curray.prototype.some = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) return true;
  }
  return false;
};
