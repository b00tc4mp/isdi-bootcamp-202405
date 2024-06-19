var Curray = require('./Curray')

Curray.prototype.findLast = function (callbackFunction) {

    for (var i = this.length - 1; i > -1; i--) {

        if (callbackFunction(this[i], i, this))

            return this[i]

    }

    return undefined

}