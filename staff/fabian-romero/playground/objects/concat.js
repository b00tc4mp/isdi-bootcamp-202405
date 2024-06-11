console.log('TEST concat in objects')


console.log('CASE concat elements from two objects')


var colors = { 0: 'rosa', 1: 'rojo', 2: 'azul', length: 3 }
var colors2 = { 0: 'verde', 1: 'oro', 2: 'cielo', length: 3 }

console.log(colors)
console.log(colors2)


colors.concat = function (object) {
    var result = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var elemt = this[i]

        result[result.length++] = elemt

    }

    for (var i = 0; i < object.length; i++) {
        var elemt = object[i]

        result[result.length++] = elemt

    }

    return result

}

var colors3 = colors1.concat(colors2)

console.log(colors3)