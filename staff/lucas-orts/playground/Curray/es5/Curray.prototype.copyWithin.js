var Curray = require('./Curray')

Curray.prototype.copyWithin = function (target, start, end) {
    if (end === undefined || end > this.length) {
        end = this.length
    }

    else if (end < 0) {
        end = this.length + end
    }

    else if (end < -this.length) {
        end = 0
    }

    if (start < 0) {
        start = this.length + start
    }
    else if (start < -this.length) {
        start = 0
    }

    if (end <= start) {
        return this
    }

    if (target < 0) {
        target = this.length + target
    }

    else if (target < -this.length) {
        target = 0
    }

    else if (target > this.length) {
        return this
    }

    var temporal = target;
    for (var i = start; i < end; i++) {
        this[temporal] = this[i]
        temporal++
    }
    return this
}