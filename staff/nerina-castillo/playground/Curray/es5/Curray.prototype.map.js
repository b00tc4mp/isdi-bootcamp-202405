var Curray = require("./Curray");

Curray.prototype.map = function (callbackFunction) {
  var newObject = new Curray();
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var mappedElement = callbackFunction(element, i, this);

    newObject[i] = mappedElement;
    newObject.length++;
  }
  return newObject;
};
