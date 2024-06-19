var Curray = require("./Curray")

Curray.prototype.findLastIndex = function (callback) {
    for (var i = this.length - 1; i > 0; i--) {
        if (callback(this[i], i, this)) return i
    }

    return -1
}
