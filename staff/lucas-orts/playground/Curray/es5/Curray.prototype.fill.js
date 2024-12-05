var Curray = require("./Curray")

Curray.prototype.fill = function (value, start, end) {
    if (start === undefined || start < -this.length) {
        start = 0
    }
    else if (start > this.length - 1) {
        return this
    }
    else if (start < 0) {
        start = this.length + start
    }
    if (end < 0) {
        end = this.length + end
    }
    else if (end === undefined || end > this.length - 1) {
        end = this.length
    }
    else if (end <= start) {
        return this
    }
    for (var i = start; i < end; i++) {
        this[i] = value
    }
    return this
}
