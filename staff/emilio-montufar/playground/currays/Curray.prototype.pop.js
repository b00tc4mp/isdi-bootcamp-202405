var Curray = require('./Curray')

Curray.prototype 

cars.pop = function () {
    var element = this[this.length - 1]

    delete this[--this.length]

    return element
}
var last = cars.pop()