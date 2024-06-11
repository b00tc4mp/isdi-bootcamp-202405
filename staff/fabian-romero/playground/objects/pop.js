console.log('TEST pop')

console.log('CASE pop an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
//[{...}, {...}, {...}]
console.log(cars.length)
// 2

console.log(cars)
//[{...},{...}]

cars.pop = function () {
    var element = this[this.length - 1]

    //delete this[this.length - 1]
    //this.length--
    delete this[--this.length]

    return element
}

var last = cars.pop()

console.log(cars)
//[{...}.{...}]

console.log(cars.length)
//2

console.log(last)
//{ brand: 'fiat', model: '500', year: 2017 }