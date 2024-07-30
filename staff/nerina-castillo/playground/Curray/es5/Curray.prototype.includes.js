var Curray = require("./Curray");

Curray.prototype.includes = function (element, index) {
  if (index === 0) index = 0;
  else if (index < 0) index = this.length + index;

  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};
