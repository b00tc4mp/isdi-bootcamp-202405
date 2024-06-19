var Curray = require('./Curray')

Curray.prototype.slice = function (item1, item2) {

    var newObject = { length: 0 }

    if (item2 === undefined) {

        item2 = this.length

    } else if (item2 < 0) {

        item2 = this.length + item2

    }
    if (item1 < 0) {

        item1 = this.length + item1

    } else if (item1 === undefined) {

        item1 = 0
    }


    for (var index = item1; index < item2; index++) {

        newObject[newObject.length++] = this[index]

    }

    return newObject

}