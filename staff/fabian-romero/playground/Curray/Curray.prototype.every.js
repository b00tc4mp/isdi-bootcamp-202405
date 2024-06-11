var Curray = require('./Curray')

Curray.prototype.ever = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) // aquí la llamada de la funcion en la longitud
            return false
    }

    return true

}