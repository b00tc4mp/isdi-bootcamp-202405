var Curray = require("./Curray")

Curray.prototype.findLast = function (callback) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (callback(this[i], i, this)) return this[i]
    }

    return undefined
}
