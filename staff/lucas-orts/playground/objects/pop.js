console.log('CASE pop an element to object')
var cars = new Object
cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)

console.log(cars.length)
//cars.pop = function () {
//    delete this[this.length - 1]
//   return this.length--
//}
cars.pop = function () {
    var lastElement = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
    // delete this[--this.length] (tambien sirve)
    return lastElement
}
console.log(cars.pop())
console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
