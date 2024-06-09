var Curray = require('./Curray')

Curray.prototype.map = function (callbackFunction) {
    var newObject = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        newObject[newObject.length++] = callbackFunction(this[i], i, this)
    }
    return newObject
}
