console.log('TEST pop')
console.log('CASE pop an element to object')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

cars.pop()
console.log(cars.length)
//2
console.log(cars)
// [{...}, {...}]
console.log(cars.pop())
// {brand: 'lamborgini', model: 'murcielago', year: 2010}