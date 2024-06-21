var Curray = require("./Curray");

Curray.prototype.reduceRight = function (callback, initialValue) {
  var accumulator;
  var startIndex = this.length - 1;

  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    accumulator = this[startIndex];
    startIndex--;
  }
  for (var i = startIndex; i >= 0; i--) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
