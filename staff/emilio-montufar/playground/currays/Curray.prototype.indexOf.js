var Curray = require("./Curray");

Curray.prototype.indexOf = function (cat) {
  for (i = 0; i < this.length; i++) {
    if (this[i] === cat) {
      var index = i;

      return index;
    }
  }
  return -1;
};