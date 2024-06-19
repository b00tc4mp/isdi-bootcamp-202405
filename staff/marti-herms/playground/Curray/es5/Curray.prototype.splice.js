var Curray = require('./Curray');

Curray.prototype.splice = function (start, deleteCount = this.length, ...item) {
    var newCurray = new Curray();

    if (start < 0 && start >= -this.length) {
        start = start + this.length;
    } else if (start < -this.length) {
        start = 0;
    } else if (start >= this.length) {
        start = this.length;
    } else if (start === undefined) {
        return newCurray;
    }

    if (deleteCount < 0 || deleteCount === undefined) {
        deleteCount = 0;
    }

    for (var i = start; i < start + deleteCount; i++) {
        newCurray[newCurray.length++] = this[i];
        for (var j = start; j < this.length; j++) {
            this[j] = this[j + 1];
        }
        delete this[--this.length];
    }
    for (var i = 0; i < item.length; i++) {
        for (var j = this.length; j > start; j--) {
            this[j] = this[j - 1];
        }
        this[start + i] = item[i];
        this.length++;
    }

    return newCurray;
}