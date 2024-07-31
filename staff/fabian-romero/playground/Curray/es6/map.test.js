const Curray = require('./Curray')


console.info('TEST Curray.prototype.map')

console.info('CASE map in curray')

{
    const numeros = new Curray(1, 4, 9, 16)

    const map1 = numeros.map(function (x) {

        return x * 2
    })

    console.assert(map1 instanceof Curray, 'map1 is a curray')
    console.assert(map1[0] === 2, 'map1 at 0 is 2')
    console.assert(map1[1] === 8, 'map1 at 1 is 8')
    console.assert(map1[2] === 18, 'map1 at 2 is 18')
    console.assert(map1[3] === 32, 'map1 at 3 is 32')
    console.assert(map1.length === numeros.length, 'map1 length equals to numeros length')
}