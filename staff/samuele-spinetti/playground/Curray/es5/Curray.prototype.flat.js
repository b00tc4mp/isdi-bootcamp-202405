var Curray = require('./Curray')

Curray.prototype.flat = function (depth = 1) {
    var flatted = new Curray()

    function loop(curray, count) {
        for (var i = 0; i < curray.length; i++) {
            var element = curray[i]

            if (!(element instanceof Curray) || count === depth)
                flatted[flatted.length++] = element
            else
                loop(element, count + 1)
        }
    }

    loop(this, 0)

    return flatted
}