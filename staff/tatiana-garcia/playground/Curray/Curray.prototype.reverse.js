var Curray = require('./Curray')

Curray.prototype.reverse = function () {

    var newObject = { length: 0 }

    for (var index = this.length - 1; index >= 0; index--) {

        var flower = this[index]

        newObject[newObject.length++] = flower

    }

    return newObject

}