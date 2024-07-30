var Curray = require("./Curray");

Curray.prototype.slice = function (begining, end) {
  if (begining === undefined) begining = this.length - 1;
  else if (end < 0) end = this.length + end;
  else if (begining === undefined || begining < 0)
    begining = this.length + begining;

  var newNames = new Curray();
  for (i = begining; i < end; i++) {
    newNames[newNames.length++] = this[i];
  }
  return newNames;
};
