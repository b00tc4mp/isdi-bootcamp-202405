var Curray = require("./Curray")

Curray.prototype.unshift = function (...elements) {
    var numElements = elements.length
    var newLength = this.length + numElements

    for (var i = this.length - 1; i >= 0; i--) {

        this[i + numElements] = this[i]
    }

    for (var j = 0; j < numElements; j++) {

        this[j] = elements[j]
    }

    this.length = newLength


    return this.length
}