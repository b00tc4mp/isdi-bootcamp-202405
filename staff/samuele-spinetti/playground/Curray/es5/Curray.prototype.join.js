var Curray = require('./Curray')

Curray.prototype.join = function (separator) {
    if (separator === undefined)
        separator = ','

    var res = ""

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res += elem

        if (i < this.length - 1)
            res += separator

    }

    return res
}