var Curray = require("./Curray");

Curray.prototype.forEach = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var elem = this[i];
    callback(elem, i, this);
  }
};
