var Curray = require('./Curray');

Curray.prototype.some = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (!callbackFn(this[i])) {
            return false;
        }
    }
    return true;
}