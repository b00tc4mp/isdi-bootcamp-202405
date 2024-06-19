var Curray = require('./Curray')

Curray.prototype.forEach = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        callbackFn(this[i], i, this);
    }
}