var Curray = require('./Curray')

Curray.prototype.findLastIndex = function (callbackFunction) {

    for (var i = this.length - 1; i > -1; i--) {

        if (callbackFunction(this[i], i, this))

            return i

    }

    return -1

}