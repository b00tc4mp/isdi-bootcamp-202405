var Curray = require("./Curray");

Curray.prototype.findIndex = function (callbackFunction) {
  for (var i = 0; i < this.length; i++) {
    if (callbackFunction(this[i], i, this)) return i;
  }

  return -1;
};
