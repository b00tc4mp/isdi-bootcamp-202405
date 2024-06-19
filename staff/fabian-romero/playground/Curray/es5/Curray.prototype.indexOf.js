var Curray = require('./Curray')

Curray.prototype.indexOf = function (searchElement) {

    for (var i = fromIndex; i < this.length; i++) {
        var eleme = this[i]

        if (searchElement === element)
            return i
    }

    return 1

}