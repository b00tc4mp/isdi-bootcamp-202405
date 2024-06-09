var Curray = require('./Curray')

Curray.prototype.indexOf = function (searchElement, fromIndex) {

    if (fromIndex === undefined)
        fromIndex = 0

    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex

        if (fromIndex < 0)
            fromIndex = 0
    }

    for (var i = fromIndex; i < this.length; i++) {
        var element = this[i]

        if (searchElement === element)
            return i
    }

    return -1

}