console.log('TEST objects')

console.log('CASE add elements to object')

var o = new Object // {}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3 }

console.log('CASE remove last element from object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3 }

delete o[2]
// o.length = o.length - 1
// o.length -= 1
o.length--

console.log(o)
// { 0: 10, 1: 20, length: 2 }

console.log('CASE remove last 2 elements from object')

var colors = new Object

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'
colors.length = 4

console.log(colors)
// { 0: red, 1: green, 2: blue, 3: yellow, length: 4 }

delete colors[3]
delete colors[2]
// colors.length = colors.length - 2
colors.length -= 2

console.log(colors)
// { 0: red, 1: green, length: 2 }

console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
//cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars['2'] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

//cars.push = function (element) {
cars['push'] = function (element) {
    // TODO add element into `this` object (cars)
    //this[this.length] = element
    this[this.length++] = element

    // this.length = this.length + 1
    //this.length++
    return this.length
    //return this.length++ // WARN
    // return ++this.length
}

//var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
var count = cars['push']({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4
console.log(count)
// 4

console.log('CASE push many elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 4: 'cows', length: 4 }

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

// TODO implement animals.push

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length)
// 7
console.log(count)
// 7

console.log('CASE pop the last element from object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
// 3

cars.pop = function () {
    var element = this[this.length - 1]

    // delete this[this.length - 1]
    // this.length--
    delete this[--this.length]

    return element
}

var last = cars.pop()

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }