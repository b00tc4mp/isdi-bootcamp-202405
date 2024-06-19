var Curray = require("./Curray");

Curray.prototype.toString = function () {
  var res = "";

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];

    res += elem;

    if (i < this.length - 1) res += ",";
  }

  return res;
};
