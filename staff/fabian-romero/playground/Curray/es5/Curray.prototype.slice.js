var Curray = require('./Curray')

Curray.prototype.slice = function (fromIndex, endIndex) {

    if (endIndex === undefined)
        endIndex = this.length

    else if (endIndex < 0)
        endIndex = this.length + endIndex

    if (fromIndex === undefined)
        fromIndex = this.length + fromIndex

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex


    var newObject = { length: 0 }
    for (var i = fromIndex; i < endIndex; i++) {
        newObject[newObject.length++] = this[i]

    }
    return newObject
}
