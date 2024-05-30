console.log("TEST arrays");

console.log('CASE add elemtents to array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a);
// [10, 20, 3]

console.log(a.length)
// 3

console.log('CASE remove last element from array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a);
// [10, 20, 30]
console.log(a.length)
// 3

a.length = a.length - 1

console.log(a)
// [10, 20]
console.log(a.length)
// 2

a.length--

console.log(a.length)
// 1

console.log('CASE remove last 2 elements from array')

var colors = new Array

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'

console.log(colors)
// ['red', 'green', 'blue', 'yellow']

console.log(colors.length)
// 4

colors.length -= 2
console.log(colors)
// ['red', 'green']

console.log(colors.length)
// 2

console.log('CASE push an element to array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
//3

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
console.log(cars)
// [{...}, {...}, {...}, {...}]
console.log(cars.length)
// 4

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
