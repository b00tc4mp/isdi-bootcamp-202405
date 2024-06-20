const Curray = require("./Curray")


Curray.prototype.find = function (callBlackFuction) {
    for (var i = 0; i < this.length; i++) {
        if (callBlackFuction(this[i], i, this))
            return this[i]
    }
    return undefined
}


