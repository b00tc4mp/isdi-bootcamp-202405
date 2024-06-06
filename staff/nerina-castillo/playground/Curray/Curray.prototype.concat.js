var Curray = require("./Curray");

Curray.prototype.concat = function () {
  var newObject = { length: 0 };

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];

    newObject[newObject.length++] = elem;
  }

  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];

    for (var j = 0; j < argument.length; j++) {
      var elem = argument[j];

      newObject[newObject.length++] = elem;
    }
  }

  return newObject;
};
