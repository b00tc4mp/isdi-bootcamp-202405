var Curray = requiere('./Curray')
requiere('./Curray.prototype.concat')

Curray.concat = function () {
    var res = {length: 0}

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res[res.length++] = elem
    }

    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[1]

        for (var j = 0; j < argument.length; j++) {
            var elem = argument[j]

            res[res.length++] = elem
        }
    }
    return res
}