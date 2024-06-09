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

console.log(cars)
// [{...}, {...}, {...}]
console.log(cars.length)
// 3

var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// [{...}, {...}, {...}, {...}]
console.log(cars.length)
// 4
console.log(count)
// 4

console.log('CASE push multiple elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length)
// 7
console.log(count)
// 7

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

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }

console.log('CASE element at index')

var nums = [5, 12, 8, 130, 44]

console.log(nums)
// [5, 12, 8, 130, 44]
console.log(nums.length)
// 5

var num = nums.at(3)

console.log(num)
// 130

var num = nums.at(0)

console.log(num)
// 5

var num = nums.at(-3)

console.log(num)
// 8

var num = nums.at(100)

console.log(num)
// undefined

var num = nums.at(-100)

console.log(num)
// undefined

console.log('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c']
var chars2 = ['d', 'e', 'f']

console.log(chars1)
// ['a', 'b', 'c']
console.log(chars2)
// ['d', 'e', 'f']

var chars3 = chars1.concat(chars2)

console.log(chars1)
// ['a', 'b', 'c']
console.log(chars2)
// ['d', 'e', 'f']
console.log(chars3)
// ['a', 'b', 'c', 'd', 'e', 'f']

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

////// TODO implement case for join
console.log('CASE to join multiple elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

console.log(animals.join('-'))
// "pigs-goats-sheep-cows"

var things = [ true, 'hello world', 100, {name: 'Oswald'}, [10, 20, 30], function(){}]

var joined = things.join(' $ ')

console.log(joined)

// TODO implement case for includes
console.log('CASE includes to confirm')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

console.log(animals.includes('pigs'))


var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'red']
var included = colors.includes('pink', 2)
console.log(included)

// TODO implement case for indexOf
console.log('CASE indexOf to search position in array')

var animals = ['pigs', 'goats', 'sheep', 'cows', 'pigs']

var index = animals.indexOF('sheep')
console.log(index)
var index = animals.indexOf('bird')
console.log(index)

console.log("CASE lastindexOF from array from index")

var index = animals.indexOf('pigs')
console.log(index)

var index = animals.indexOF("pigs")



// TODO implement case for lastIndexOf

console.log("CASE lastindexOF from array")
var pets = ['dog', 'cat', 'bird', 'bird', 'turtle', 'snake']

var lastindex = pets.lastindexOF('bird')
console.log(lastindex)

var lastindex = pets.lastindexOF('elephant')
console.log(lastindex)

// TODO implement case for slice

var animals = ['pigs', 'goats', 'sheep', 'cows', 'pigs']

console.log(animals)
console.log(animals.slice(2))
console.log(animals.slice(2, 3))
console.log(animals.slice(-2))

// TODO implement case for reverse



// TODO implement case for shift
// TODO implement case for copyWithin
