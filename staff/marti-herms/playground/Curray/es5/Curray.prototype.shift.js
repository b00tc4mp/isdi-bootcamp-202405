var Curray = require('./require');

Curray.prototype.shift = function () {
    if (this.length === 0) {
        return undefined;
    } else {
        var removedElement = this[0];
        this.length--;
        for (var i = 0; i < this.length; i++) {
            this[i] = this[i + 1];
        }
        delete this[this.length];
        return removedElement;
    }
}