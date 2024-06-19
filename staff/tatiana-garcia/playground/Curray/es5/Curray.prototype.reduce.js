var Curray = require('./Curray')

Curray.prototype.reduce = function (callback, initialValue) {
    var accumulator = initialValue

    for (var i = 0; i < this.length; i++) {
        var currentValue = this[i]
        accumulator = accumulator + currentValue

        callback(accumulator, currentValue, i, this)
    }
    return accumulator
}
