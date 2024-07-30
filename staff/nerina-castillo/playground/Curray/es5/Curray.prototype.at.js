var Curray = requide("./Curray");

Curray.prototype.at = function (index) {
  if (index > -1) {
    return this[index];
  } else {
    return this[this.length + index];
  }
};
