var Curray = require('./Curray')

Curray.prototype.map = function (callbackFunction) {
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {

        newObject[newObject.length++] = callbackFunction(this[i], i, this)

    }

    return newObject

}
/* Curray.prototype.map = function (callback) {
var mapped = new Curray
for (var i = 0; this.length; i++) {
    var element = this[i]

    var mappedElement = callback(element)

    mapped[i] = mappedElement
    mapped.length++
}
return mapped}*/