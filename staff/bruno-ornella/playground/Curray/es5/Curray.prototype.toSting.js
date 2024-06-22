var Curray = require('./Curray')

Curray.prototype.toString = function () {
    var string = ''

    for (var i = 0; i < this.length; i++) {
        string += this[i]

        if (i < this.length - 1)
            string += ','
    }

    return string
}