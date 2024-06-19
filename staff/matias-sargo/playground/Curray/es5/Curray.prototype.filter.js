var Curray = require('./Curray')

Curray.prototype.filter = function (callbackFunction) {
    var newObject = new Curray

    for (var i = 0; i < this.length; i++) {

        if (callbackFunction(this[i], i, this)) {

            newObject[newObject.length++] = this[i]

        }

    }

    return newObject

}