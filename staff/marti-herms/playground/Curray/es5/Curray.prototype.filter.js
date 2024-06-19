var Curray = require('./Curray');

Curray.prototype.filter = function (callbackFn) {
    var newCurray = Curray();
    for (var i = 0; i < this.length; i++) {
        if (callbackFn(this[i], i, this)) {
            newCurray[newCurray.length++] = this[i];
        }
    }
    return newCurray;
}