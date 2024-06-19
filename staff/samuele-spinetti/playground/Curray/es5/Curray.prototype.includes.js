var Curray = require('./Curray')

Curray.prototype.includes = function (element, index) {
    if (index === undefined)
        index = 0

    else if (index < 0)
        index = this.length + index

    for (i = index; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true
    }
    return false
}