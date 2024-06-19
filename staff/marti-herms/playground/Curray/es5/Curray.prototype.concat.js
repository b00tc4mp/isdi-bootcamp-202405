var Curray = require('./Curray');

Curray.prototype.concat = function () {
    var newCurray = new Curray();
    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        newCurray[newCurray.length++] = elem
    }
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var elem = arguments[i][j]
            newCurray[newCurray.length++] = elem;
        }
    }
    return newCurray;
}
