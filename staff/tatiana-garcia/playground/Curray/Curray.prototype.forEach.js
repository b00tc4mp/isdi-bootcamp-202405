var Curray = require('./Curray')

Curray.prototype.forEach = function (callbackFunction) {

    for (var i = 0; i < this.length; i++) {

        var elem = this[i]

        callbackFunction(elem)
    }


}

// Curray.prototype.forEach(function (element) {

//     copy[copy.length++] = element
// })

