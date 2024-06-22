var Curray = require('./Curray')

Curray.prototype.indexOf = function (animalName) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (animalName === element) {
            return i
        }
    }
    return -1
}