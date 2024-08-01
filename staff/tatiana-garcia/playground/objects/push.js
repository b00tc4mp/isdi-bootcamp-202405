console.info('TEST push')

console.info('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.info(cars)
// {0: {...}, 1: {...}, 2:{...}, length: 3}
console.info(cars.length)
// 3

cars.push = function (element) {

    this[this.length] = element
    this.length++
    //return ++this.length es igual que primero hacer esto: this.length++ y despues retornar this.length
    return this.length

}

//var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
var count = cars['push']({ brand: 'ford', model: 'fiesta', year: 2005 })

console.info(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.info(cars.length)
// 4
console.info(count)
// 4

//-------------------------------------------------------------------------------------

console.info('CASE push multiple elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }

console.info(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.info(animals.length)
// 4

// animals.push = function (element1, element2, element3) {
//     this[this.length++] = element1
//     this[this.length++] = element2
//     this[this.length++] = element3

//     return this.length
// } esto no permite que se vaya modificando

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]

        this[this.length++] = argument
    }

    return this.length
}

var count = animals.push('chickens', 'cats', 'dogs')

console.info(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs', length: 7 }
console.info(animals.length)
// 7
console.info(count)
// 7
