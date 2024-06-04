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
