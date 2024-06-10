var Curray = require('./Curray')

Curray.prototype.indexOf = function (searchElement, fromIndex) {
    /*
        var element = this[0]
        if (searchElement === element)
            return 0
        var element = this[1]
        if (searchElement === element)
            return 1
        var element = this[2]
        if (searchElement === element)
            return 2
        var element = this[3]
        if (searchElement === element)
            return 3
        var element = this[4]
        if (searchElement === element)
            return 4
    
        return -1
            */
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