var Curray = require('./Curray')

Curray.prototype.map = function (callbackFunction) {
    var mapped = new Curray
    for (var i = 0; i < this.length; i++) {

        var mappedElement = callbackFunction(this[i], i, this)

        mapped[i] = mappedElement
        mapped.length++

    }

    return mapped

}