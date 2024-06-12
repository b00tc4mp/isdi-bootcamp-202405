console.info('TEST Array.prototye.pop')

console.info('CASE pop an element to array') // se usa cuando quiero eliminar el elemento final del array.



var colors = new Array // crear una nueva array '('..., '...', '...) si lo pongo asi es compatible ya con curraiz

colors[0] = { cara: 'rojo', cuerpo: 'amarillo', pies: 'verde' }
colors[1] = { cara: 'lila', cuerpo: 'rosa', pies: 'nude' }
colors[2] = { cara: 'azul', cuerpo: 'celeste', pies: 'cian' }
colors.length = 3
// cuando creo variables para que me guarden los elementos eliminados, son variables temporales
var newColors = colors.pop() // ya eliminado compruebo si newcolor es igual a color ya con la funcion hecha.


console.assert(colors[0].cara === 'rojo', 'colors at 0 cara is rojo')
console.assert(colors[0].cuerpo === 'amarillo', 'colors at 0 cara is amarillo')
console.assert(colors[0].pies === 'verde', 'colors at 0 cara is verde')

console.assert(colors[1].cara === 'lila', 'colors at 0 cara is lila')
console.assert(colors[1].cuerpo === 'rosa', 'colors at 0 cara is rosa')
console.assert(colors[1].pies === 'nude', 'colors at 0 cara is nude')

console.assert(newColors.cara === 'azul', 'colors at 0 cara is azul')
console.assert(newColors.cuerpo === 'celeste', 'colors at 0 cara is celeste')
console.assert(newColors.pies === 'cian', 'colors at 0 cara is cian')

console.assert(colors.length === 2, 'length the colors is 2')


// comprobar si es un array / si es un curray con "instanceof..." console.assert( xx instanceof xx, 'xx is an array/curray) 

//te devuelve un 'nuevo tipo curray' en el (objeto)curray en la formula... todo lo que se devuelve es un new Curray ( en el mundo de curray todo siempre es curray)



console.info('CASE pop the last element from array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

var car1 = cars[0]
var car2 = cars[1]
var car3 = cars[2]

var last = cars.pop()

console.assert(cars.length === 2, 'cars length is 2')
console.assert(car1 === cars[0], 'car1 is { brand: ferrari, model: gto, year: 1990 }')
console.assert(car2 === cars[1], 'car2 is { brand: lamborghini, model: murcielago, year: 2010 }')
console.assert(car3 === last, 'car3 is { brand: fiat, model: 500, year: 2017 }')