var Curray = require('./Curray')

Curray.prototype.shift = function () {

    var shiftName = this[0]

    this.length--

    for (var i = 0; i < this.length; i++) {

        this[i] = this[i + 1]

    }

    delete this[this.length]

    return shiftName
}
