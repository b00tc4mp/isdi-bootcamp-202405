var Curray = require('./Curray')

Curray.prototype.every = function (callback) {

    for (var i = 0; i < this.length; i++) {

        // if (callback(this[i]) === false)
        if (!callback(this[i])) {
            return false
        }

    }

    return true

}