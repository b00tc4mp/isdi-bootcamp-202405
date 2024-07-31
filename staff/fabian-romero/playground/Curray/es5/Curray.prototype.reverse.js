var Curray = require('./Curray')


Curray.prototype.reverse = function () {
    var middle = Math.floor(this.length / 2) // Calcular el índice del medio del objeto

    for (var i = 0; i < middle; i++) {
        var temp = this[i]; // Guardar temporalmente el valor actual
        this[i] = this[this.length - 1 - i] // Asignar el valor inverso al actual
        this[this.length - 1 - i] = temp // Asignar el valor temporal al inverso
    }

    return this
}