var Curray = require('./Curray')

Curray.prototype.reduce = function (callbackFn, initialValue = undefined) {
    if (initialValue === undefined) {
        var aux;
        for (var i = 0; i < this.length; i++) {
            if (i === 0) {
                aux = callbackFn(this[i], this[++i]);
            } else {
                aux = callbackFn(aux, this[i])
            }
        }
        return aux;
    }
    var aux;
    for (var i = 0; i < this.length; i++) {
        if (i === 0) {
            aux = callbackFn(initialValue, this[i]);
        } else {
            aux = callbackFn(aux, this[i])
        }
    }
    return aux;
}