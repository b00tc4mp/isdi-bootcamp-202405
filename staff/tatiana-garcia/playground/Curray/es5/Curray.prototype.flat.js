var Curray = require('./Curray')

Curray.prototype.flat = function (depth) {

    var flatted = new Curray

    if (depth === undefined) {
        depth = 1
    }

    for (var i = 0; i < this.length; i++) {

        if (i === this.length - 1) {

            var array = this[i]

            for (var j = 0; j < array.length; j++) {

                var element = array[j]

                flatted[i++] = element

                flatted.length++
            }
        } else {

            var element = this[i]

            flatted[i] = element

            flatted.length++
        }
    }

    return flatted

}

