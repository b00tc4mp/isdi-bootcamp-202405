var Curray = require('./Curray')

Curray.prototype.indexOf = function (searchElement, fromIndex = 0) {

    if (fromIndex >= this.length) {
        return -1;
    } else if (fromIndex >= -this.length && fromIndex < 0) {
        fromIndex = fromIndex + this.length;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (searchElement === this[i]) {
            return i;
        }
    }
    return -1;
}