var Curray = require('./Curray')

Curray.prototype.shift = function () {

    var deletedName = this[0]
    for (var index = 0; index < this.length - 1; index++) {
        this[index] = this[index + 1]
    }

    delete this[this.length - 1]
    this.length--

    return deletedName
}