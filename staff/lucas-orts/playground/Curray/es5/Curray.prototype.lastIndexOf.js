var Curray = require('./Curray')

Curray.prototype.lastIndexOf = function (searchElement, fromIndex) {

    if (fromIndex === undefined)
        fromIndex = this.length - 1

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var element = this[i]
        if (searchElement === element)
            return i
    }
    return -1
}