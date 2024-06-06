var Curray = require('./Curray')

Curray.prototype.pop = function () {
    var lastElement = this[this.length - 1]

    delete this[--this.length]

    return lastElement
}