var Curray = require('./Curray')

Curray.prototype.find = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFn(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
}