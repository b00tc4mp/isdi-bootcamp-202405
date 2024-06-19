var Curray = require("./Curray");

Curray.prototype.lastIndexOf = function (element, fromIndex) {
  if (fromIndex === undefined) fromIndex = this.length;
  else if (fromIndex < 0) fromIndex = this.length + fromIndex;

  for (var i = fromIndex; i > -1; i--) {
    if (this[i] === element) {
      var index = i;

      return index;
    }
  }
  return -1;
};
