var Curray = require('./Curray')

Curray.prototype.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = argument[index]

        this[this.length++] = argument
    }

    return this.length
}