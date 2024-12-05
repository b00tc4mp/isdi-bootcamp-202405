var Curray = require('./Curray')

Curray.prototype.values = function () {
    var i = 0

    var self = this

    return {
        next: function () {
            return {
                value: i < self.length ? self[i] : undefined,
                done: ++i > self.length
            }
        }
    }
}