var Curray = require('./Curray')

Curray.prototype.find = function (callbackFunction) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFunction(this[i], this)) return this[i]
    }
    return undefined
}