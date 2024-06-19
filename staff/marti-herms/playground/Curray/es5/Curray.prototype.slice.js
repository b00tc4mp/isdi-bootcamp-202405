var Curray = require('./Curray');

Curray.prototype.slice = function (start = 0, end = this.length) {
    var newCurray = new Curray();
    if (start < -this.length) {
        start = 0;
    } else if (start >= -this.length && start < 0) {
        start = start + this.length;
    }

    if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    } else if (end >= -this.length && end < 0) {
        end = end + this.length;
    }

    if (end <= start || start >= this.length) {
        return newCurray;
    }

    for (var i = 0; i < end - start; i++) {
        newCurray[i] = this[start + i];
        newCurray.length++;
    }
    return newCurray;
}