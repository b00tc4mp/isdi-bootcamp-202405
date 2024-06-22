const Curray = require("./Curray")

Curray.prototype.filter = function (callback) {
    var elem = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this))
            elem[elem.length++] = this[i]

    }
    return elem

}