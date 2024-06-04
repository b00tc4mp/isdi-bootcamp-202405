console.log('TEST arrays')

console.log('CASE add elements to array')

var a = new Array

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

console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
// 3

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// [{...}, {...}, {...}, {...}]
console.log(cars.length)
// 4

console.log('CASE push many elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

var count = animals.push('chicken', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows', 'chicken', 'cats', 'dogs']
console.log(animals.length)
// 7
console.log(count)
// 7


console.log('CASE using POP')

cars.pop()
console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
// 3

console.log('CASE pop the last element from array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
// 3

var last = cars.pop()
console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log('CASE element at index')

var numeros = [5, 12, 8, 130, 44]

console.log(numeros)
// [5, 12, 8, 130, 44]
console.log(numeros.length)
// 5

var num = numeros.at(3)

console.log(num)
// 130

var num = numeros.at(-3)

console.log(num)
// 8

var num = numeros.at(100)

console.log(num)
// undefined

console.log('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c']
var chars2 = ['d', 'e', 'f']

console.log(chars1)
//['a', 'b', 'c']
console.log(chars2)
//['d', 'e', 'f']

var chars3 = chars1.concat(chars2)

console.log(chars3)
//['a', 'b', 'c', 'd', 'e', 'f']


console.log('CASE concat elements from 5 arrays')

var nums1 = [10, 20, 30]
var nums2 = [400, 500]
var nums3 = [-60, -70]
var nums4 = [800, 900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
// [10, 20, 30]
console.log(nums2)
// [400, 500]
console.log(nums3)
// [-60, -70]
console.log(nums4)
// [800, 900]
console.log(nums5)
// [-1000]
console.log(nums6)
// [10, 20, 30, 400, 500, -60, -70, 800, 900, -1000]


console.log('CASE join in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.join()
console.log(animals2)
// Dodo,Tiger,Penguin,Dodo,Elephant

var animals3 = animals.join(" + ")
console.log(animals3)
//Dodo + Tiger + Penguin + Dodo + Elephant

var animals4 = animals.join("/")
console.log(animals4)
//Dodo/Tiger/Penguin/Dodo/Elephant


console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')
console.log(joined)
//true $ hello world $ 100 $ {object Object} $ 10,20,30 $ function () { }


console.log('CASE includes in array')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numeros)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var numeros1 = numeros.includes(6)
console.log(numeros1)
// true

var numeros2 = numeros.includes(50)
console.log(numeros2)
// false


console.log('TEST array  includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)
console.log(included)
// true

var included = colors.includes('red', 4)
console.log(included)
// true

var included = colors.includes('red', 8)
console.log(included)
// false



console.log('CASE indexOf in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(animals)
// ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(animals.length)
// 5

console.log(animals.indexOf('ant'))
// 0
console.log(animals.indexOf('bison'))
// 1
console.log(animals.indexOf('camel', 1))
// 2
console.log(animals.indexOf('giraffa'))
// -1
console.log(animals.indexOf('ant', -5))
// 0
console.log(animals.indexOf('bison', 2))
//4



console.log('CASE lastIndexOf in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']
console.log(animals.length)
// 5

console.log(animals.lastIndexOf('Penguin'))
// 2
console.log(animals.lastIndexOf('Dodo'))
// 3
console.log(animals.lastIndexOf('Dodo', 1))
// 0
console.log(animals.lastIndexOf('Giraffa'))
// -1
console.log(animals.lastIndexOf('Tiger', -4))
// 1


// TODO implement case for slice

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals)
// ['ant', 'bison', 'camel', 'duck', 'elephant' ]

console.log(animals.slice(0, 3))
// [ 'ant', 'bison', 'camel' ]
console.log(animals.slice(4))
// ['elphant']
console.log(animals.slice(2, -1))
// [ 'camel', 'duck' ]



console.log('CASE reverse in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant' ]
console.log(animals.length)
//5

var animals2 = animals.reverse()

console.log(animals2)
// [ 'Elephant', 'Dodo', 'Penguin', 'Tiger', 'Dodo' ]


console.log('CASE shift in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant' ]

var animals2 = animals.shift()

console.log(animals)
// ['Tiger', 'Penguin', 'Dodo', 'Elephant' ]
console.log(animals2)
// Dodo
console.log(animals.length)
// 4

// TODO implement case for copyWithin

var animals = ['Dodo', 'Tiger', 'Pengui', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.copyWithin(3, 1, 2)

console.log(animals2)
// ['Dodo', 'Tiger', 'Penguin', 'Tiger', 'Elephant']

var animals = ['Dodo', 'Tiger', 'Pengui', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant'

var animals3 = animals.copyWithin(0, 1, 4)

console.log(animals3)
// ['Tiger', 'Pengui', 'Dodo', 'Dodo', 'Elephant']
