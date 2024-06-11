console.log('TEST forEach in Objects')


console.log('CASE forEach')

var animals = { 0: 'puma', 2: 'tigre', 3: 'pantera', 4: 'leon', length: 5 };
var copy = { length: 0 } // se crea una variable temporal para que se vayan modificando la info (var[i], thislength, etc)

animals.forEach = function (callback) {

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        callback(elem) // forma más larga pero más clara de llamar a la función

        // callback(this[i])) // cesta es la segunda forma de hacerlo
    }
}

animals.forEach(function (elem) {
    copy[copy.length++] = elem
})

console.assert(copy.length === animals.length, 'copy lenght equals animals lenght') // assert para saber si el calculo es correcto. es para reemplazar el console.log

console.assert(copy[0] === animals[0], 'copy at 0 equals animals at 0')
console.assert(copy[1] === animals[1], 'copy at 1 equals animals at 1')
console.assert(copy[2] === animals[2], 'copy at 2 equals animals at 2')