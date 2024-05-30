console.log('TEST objects')

console.log('CASE add elements to object')

var o = new Object //{}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
//{0: 10, 1: 20, 2: 30, length: 3}
console.log('CASE remove laste element from object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
//{0: 10, 1:20, 2: 30, length: 3}

delete o[2]
//o.length= o.length - 1
//o.length -= 1
o.length--

console.log(o)
// {0: 10, 1:20 , length: 2}

console.log('CASE remove last 2 elements from object')

var colors = new Object

colors[0] = new Object

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[2] = 'yellow'

console.log(colors)
// {0: red, 1: green, 2: blue, 3:yellow, length: 4}

delete colors[3]
delete colors[2]
// colors.length = colors - length -2
colors.length -= 2

console.log(colors)
//{0: red, 1: green, length:2}

console.log('CASE push an element to object')
var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1900 }
cars[1] = { brand: 'lamborguini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
//{0: {...}, 1: {...}, 2:{...}, length: 3}
console.log(cars.length)
//3

cars.push = function (element) {
    //TODO add element into `this` objects (cars)
    this[this.length] = element
    return cars.length++;
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 });

console.log(cars)
//{0: {...}, 1:{...}. 2:{...}, length: 4}

console.log(cars.length)
//4

console.log('CASE pop an element to object')

cars.pop = function () {
    //TODO add element into `this` objects (cars)
    delete this[this.length - 1]
    this.length -= 1
    return this.length
}


//cars.pop = function () {
//TODO add element into `this` objects (cars)
//var lastElement = this[this.length -1]
//delete this[this.length - 1]
//this.length --
//return lastElement
//}

cars.pop()

console.log(cars)
console.log(cars.length)