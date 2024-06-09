var Curray = require('./Curray')

Curray.prototype.shift = function () {

    var deletedanimals = this[0]

    this.length--

    for (var index = 0; index < this.length - 1; index++) {

        this[index] = this[index + 1]

    }

    delete this[this.length]

    return deletedanimals
}