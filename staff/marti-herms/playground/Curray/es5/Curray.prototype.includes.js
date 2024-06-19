var Curray = require('./Curray');

Curray.prototype.includes = function (searchElement, fromIndex = 0) {
    if (fromIndex >= this.length) {
        return false;
    } else if (fromIndex >= -this.length && fromIndex < 0) {
        fromIndex = fromIndex + this.length;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (searchElement === this[i]) {
            return true
        }
    }
    return false;
}