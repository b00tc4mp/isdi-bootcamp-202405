var Curray = require('./Curray')

Curray.prototype.copyWithin = function (target, start, end = this.length) {
    if (target >= -this.length && target < 0) {
        target = target + this.length;
    } else if (target < -this.length) {
        target = 0;
    }

    if (start >= -this.length && start < 0) {
        start = start + this.length;
    } else if (start < -this.length) {
        start = 0;
    }

    if (end >= -this.length && end < 0) {
        end = end + this.length;
    } else if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    }

    if (end <= start || start >= this.length || target >= this.length) {
        return this;
    }
    var auxArray = [];
    for (var i = 0; i < end - start; i++) {
        auxArray[i] = this[start + i];
    }
    for (var i = 0; i < auxArray.length; i++) {
        this[target + i] = auxArray[i];
    }
    return this;
}