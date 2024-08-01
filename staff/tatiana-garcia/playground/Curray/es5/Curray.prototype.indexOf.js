var Curray = require('./Curray')

Curray.prototype.indexOf = function (element, index) {
    if (index === undefined)
        index = 0
    else if (index < 0) {
        index = this.length + index

        if (index < 0)
            index = 0
    }

    for (var i = index; i < this.length; i++) {
        // console.count(index)

        var elem = this[i]

        if (elem === element)
            return i
    }

    return -1
}