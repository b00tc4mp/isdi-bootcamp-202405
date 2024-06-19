var Curray = require('./Curray');

Curray.prototype.lastIndexOf = function (searchElement, fromIndex = this.length - 1) {
    if (fromIndex < -this.length) {
        return -1;
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        fromIndex = this.length + fromIndex;
    } else if (fromIndex >= this.length) {
        fromIndex = this.length - 1;
    }

    for (var i = fromIndex; i > -1; i--) {
        if (searchElement === this[i]) {
            return i;
        }
    }
    return -1;
}