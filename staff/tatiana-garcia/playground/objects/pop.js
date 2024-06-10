console.info('TEST pop')
console.info('CASE pop the last element from object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.info(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.info(cars.length)
// 3

cars.pop = function () {
    var element = this[this.length - 1]

    //delete this[--this.length] esto es lo mismo que delete this[this.length - 1] y despues poner  this.length--


    return element
}

var last = cars.pop()

console.info(cars)
// [{...}, {...}]
console.info(cars.length)
// 2

console.info(last)
// { brand: 'fiat', model: '500', year: 2017 }