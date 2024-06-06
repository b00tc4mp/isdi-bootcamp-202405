var Curray = require('./Curray');

Curray.prototype.pop = function () {
    var lastElement = this[this.length];
    delete this[this.length];
    return lastElement;
}