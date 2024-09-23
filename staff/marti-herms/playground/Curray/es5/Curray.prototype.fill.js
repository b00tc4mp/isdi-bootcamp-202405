var Curray = require('./Curray');

Curray.prototype.fill = function (value, start, end) {

    if (start === undefined || start < -this.length) {
        start = 0;
    } else if (start < 0) {
        start += this.length;
    } else if (start >= this.length) {
        return this;
    }

    if (end === undefined || end >= this.length) {
        end = this.length;
    } else if (end < 0) {
        end += this.length;
    } else if (end < -this.length) {
        end = 0;
    } else {

        return this;
    }

    for (var i = start; i < end; i++) {

        this[i] = value
    }

    return this

}