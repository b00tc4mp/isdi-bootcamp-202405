var Curray = require('./Curray')

Curray.prototype.reverse = function () {
    var tmp
    for (var i = 0; i < this.length - i; i++) {
        tmp = this[i]

        this[i] = this[this.length - i - 1]

        this[this.length - i - 1] = tmp
    }

    return this

}