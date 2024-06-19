var Curray = require("./Curray");

Curray.prototype.join = function (separator) {
  if (separator === undefined) {
    separator = ",";
  }
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      count += separator;
    }
  }
  return joined;
};
