var Curray = require('./Curray')

Curray.prototype.lastIndexOf = function (item, fromIndex) {

    if (fromIndex === undefined) {

        fromIndex = this.length - 1

    } else if (fromIndex < 0) {

        fromIndex = this.length + fromIndex

    }

    for (var index = fromIndex; index > -1; index--) {

        if (item === this[index]) {

            return index
        }
    }
    return -1
}