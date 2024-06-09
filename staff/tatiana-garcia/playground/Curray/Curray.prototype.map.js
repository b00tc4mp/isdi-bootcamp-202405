var Curray = require('./Curray')

Curray.prototype.map = function (callbackfunction) {

    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {


        newObject[newObject.length++] = callbackfunction(this[i], i, this)
    }

    return newObject

}