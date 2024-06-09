new Curray = require('./Curray')

curray.includes = function (item, index) {

    if (index === undefined) {

        index = 0
    } else if (index < 0) {

        index = this.length + index
    }

    for (var i = index; i < this.length; i++) {

        if (item === this[i]) {

            return true
        }
    }

    return false
}