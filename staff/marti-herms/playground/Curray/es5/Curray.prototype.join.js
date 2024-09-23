var Curray = require('./Curray');

Curray.prototype.join = function (separator = ',') {
    var finalString = '';
    for (var i = 0; i < this.length; i++) {
        finalString += this[i];
        if (i < this.length - 1) {
            finalString += separator;
        }
    }
    return finalString;
}