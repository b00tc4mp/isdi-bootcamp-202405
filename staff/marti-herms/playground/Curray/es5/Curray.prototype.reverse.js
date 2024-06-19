var Curray = require('./Curray')

Curray.prototype.reverse = function () {
    var aux;
    for (var i = 0; i < this.length - i; i++) {
        aux = this[i];
        this[i] = this[this.length - i - 1];
        this[this.length - i - 1] = aux;
    }
    return this;
}