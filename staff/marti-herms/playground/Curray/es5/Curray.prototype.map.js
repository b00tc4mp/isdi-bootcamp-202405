var Curray = require('./Curray');

Curray.prototype.map = function (callbackFn) {
    var newCurray = new Curray;
    for (var i = 0; i < this.length; i++) {
        newCurray[newCurray.length++] = callbackFn(this[i], i, this);
    }
    return newCurray;
}