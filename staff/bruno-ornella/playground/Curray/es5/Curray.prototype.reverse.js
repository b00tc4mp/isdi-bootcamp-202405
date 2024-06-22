const Curray = require("./Curray");


Curray.prototype.reverse = function () {
    var temp;
    for (var i = 0; i < this.length - i; i++) {
        temp = this[i]
        this[i] = this[this.length - i - 1]
        this[this.length - i - 1] = temp
    }
    return this
}