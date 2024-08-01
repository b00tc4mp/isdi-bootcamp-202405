var Curray = require("./Curray");

Curray.prototype.pop = function () {
  if (this.length > 0) {
    var element = this[this.length - 1];
    delete this[--this.length];

    return element;
  }
  return undefined;
};
