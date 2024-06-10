var Curray = require('./Curray')


Curray.prototype.some = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (element(this[i]))
            return true
    }
    return false
}



