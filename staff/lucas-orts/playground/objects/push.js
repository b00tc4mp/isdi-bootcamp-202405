console.log('CASE push an element to object')
var cars = new Object
cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)

console.log(cars.length)

cars.push = function (element) {
    this[this.length] = element
    return ++this.length
    //[opcion 2]this[this.length] = element
    //this.length++
    //return this.length[fin opcion 2]
    //[opcion 3]this[this.length] = element
    //return ++this.length[fin opcion 3]

    //return this.length++ WARNING
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)

console.log('CASE push many elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4
animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]
        this[this.length++] = argument
    }
    return this.length
}
//  implement animals.push



var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length)
// 7
console.log(count)
