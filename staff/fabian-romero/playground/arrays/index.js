console.log('TEST arrays')

console.log('CASE add elements to array')

var a = new Array // []

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)
// [10, 20, 30]
console.log(a.length)
// 3

console.log('CASE remove last element from array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)
// [10, 20, 30]
console.log(a.length)
// 3

// a.length = a.length - 1
// a.length -= 1
a.length--

console.log(a)
// [10, 20]
console.log(a.length)
// 2

console.log('CASE remove last 2 elements from array')

var colors = new Array

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'

console.log(colors)
// [red, green, blue, yellow]
console.log(colors.length)
// 4

// colors.length = colors.length - 2 
colors.length -= 2

console.log(colors)
// [red, green]
console.log(colors.length)
// 2

console.log('CASE push an element to array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
console.log(cars.length)

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })


cars.push = function (element) {
    this[this.length] = element
    return ++this.length
}

console.log(cars)
console.log(cars.length)

// this.length = this.length +
// this.length = this.length ++ opciones de sumar 

// Return this.length
// return this.length++ = WARM 
// primero se hace la suma, como en cualquier operacion matematica, luego se retorna
// De donde pones los "++" se hace la function, si se pone antes del this.length se retorna la 
// suma, si se pone despues la suma se hace del ultimo elemento


console.log('CASE pop the last element from array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
console.log(cars.length)

var last = cars.pop()

console.log(cars)
console.log(cars.length)
console.log(last)



console.log('CASE push many element to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']
var count = animals.push('chicken', 'cats', 'dog')

console.log(animals)
console.log(animals.length)


console.log('CASE elemnt at index')
var nums = [5, 12, 8, 130, 44];

console.log(nums)

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of -2 returns 130"




