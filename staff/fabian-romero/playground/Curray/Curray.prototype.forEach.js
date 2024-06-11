var Curray = require('./Curray')

Curray.prototype.forEach = function (callback) {

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        callback(elem) // forma más larga pero más clara de llamar a la función

        // callback(this[i])) // cesta es la segunda forma de hacerlo
    }
}