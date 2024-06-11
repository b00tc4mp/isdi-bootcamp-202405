console.log('TEST indexOf in Object')




console.log('CASE indexOf in object')

var colors = { 0: 'rosa', 1: 'rojo', 2: 'amarillo', 3: 'azul', 4: 'verde', length: 5 }

colors.indexOf = function (searchElement) {
    // var element = this[0]
    // if (elem === element)
    // return 0

    // var element = this[1]
    // if (elem === element)
    // return 1

    // var element = this[2]
    // if (elem === element)
    // return 2

    // var element = this[3]
    // if (elem === element)
    // return 3

    // var element = this[4]
    // if (elem === element)
    // return 4

    for (var i = fromIndex; i < this.length; i++) {
        var eleme = this[i]

        if (searchElement === element)
            return i
    }

    return 1

}

var index = colors.indexOf('rosa')
console.log(index)

var index = colors.indexOf('verde')
console.log(index)






var colors = { 0: 'rosa', 1: 'rojo', 2: 'amarillo', 3: 'azul', 4: 'verde', length: 5 }
//metodo en negativo //


colors.indexOf = function (Element, Index) {

    if (index ==== undefined) {
        index = 0

        if (index < 0) {
            index = this.length + index

            if (i// completar este que no lo entendi bien! //

    }

        for (var i = index; i < this.length; i++) {
            var eleme = this[i]

            if (searchElement === element)
                return i
        }
    }
}


return 1


if (fromIndex === undefined)
    fromIndex = 0

else if (fromIndex < 0)
    fromIndex = this.length + fromIndex

}


var index = colors.indexOf('rosa')
console.log(index)

var index = colors.indexOf('verde')
console.log(index)

var index = colors.indexOf('blanco')
console.log(index)

var index = colors.indexOf('azul')
console.log(index)

var index = colors.indexOf('rosa', -3)
console.log(index)