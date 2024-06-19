var Curray = require('./Curray')

Curray.prototype.slice = function (fromIndex, endIndex) {
    if (endIndex === undefined)
        endIndex = this.length

    else if (endIndex < 0)
        endIndex = this.length + endIndex

    var newObj = { length: 0 }
    for (var i = fromIndex; i < endIndex; i++) {
        newObj[newObj.length++] = this[i]
    }
    return newObj
}
