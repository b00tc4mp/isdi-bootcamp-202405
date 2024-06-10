console.log("TEST arrays")

console.log("CASE add elemets to array")

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)

console.log("CASE remove last element from array")

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)

a.length = a.length - 1

console.log(a)

console.log(a.length)

console.log("CASE remove last 2 element from array")

var colors = new Array

colors[0] = "red"
colors[1] = "green"
colors[2] = "blue"
colors[3] = "yellow"

console.log(colors)

console.log(colors.length)

colors.length -= 2

console.log(colors)

console.log(colors.length)

console.log("CASE push an element to array")

var cars = new Array

cars[0] = { brand: "ferrari", model: "gto", year: 1990 }
cars[1] = { brand: "lamborghini", model: "murcielago", year: 2010 }
cars[2] = { brand: "fiat", model: "500", year: 2017 }

console.log(cars)

console.log(cars.length)

cars.push({ brand: "ford", model: "fiesta", year: 2005 })

console.log(cars)

console.log(cars.length)

console.log('CASE push many elements to array')

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


console.log("CASE delete last element from array")

var bikes = new Array

bikes[0] = { brand: "ducati", model: "multistrada", year: 2018 }
bikes[1] = { brand: "ktm", model: "duke", year: 2012 }
bikes[2] = { brand: "bmw", model: "gs", year: 2008 }

console.log(bikes)

console.log(bikes.length)

var pop = bikes.pop()

console.log(pop)

console.log(bikes)

console.log(bikes.length)

console.log("CASE element at index")

var nums = [5, 12, 8, 130, 44]

console.log(nums)
// [5, 12, 8, 130, 44]
console.log(nums.length)
// 5

var num = nums.at(3)

console.log(num)
//130

var num = nums.at(0)

console.log(num)
//5

var num = nums.at(-3)

console.log(num)
//8

var num = nums.at(100)

console.log(num)
// undefinded, ya que no existe esa posicion dentro del array

var num = nums.at(-100)

console.log(num)
// undefined

console.log("CASE concat elements from two arrays")

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

console.log("CASE join elements from array")

const elements = ['Fire', 'Air', 'Water'];

var fruits = ["apple", "orange", "banana", "pinapple", "watermelon"]

console.log(fruits)
// Expected output: [apple , orange, banana, pineapple, watermelon]

var joined = fruits.join()

console.log(joined)

console.log(elements.join())
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"

console.log("implement case for includes")

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false


console.log("implement case for indexOf")

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1


// TODO implement case for lastIndexOf
console.log("CASE lastIndexOf from array")
var dpets = ["dog", "cat", "bird", "turtle", "snake"]
var lastIndex = dpets.lastIndexOf("bird")
console.log(lastIndex)
//2
var lastIndex = dpets.lastIndexOf("elephant")
console.log(lastIndex)
// -1

// TODO implement case for slice

const animals2 = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals2.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals2.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals2.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals2.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals2.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals2.slice());


// TODO implement case for reverse
// TODO implement case for shift
// TODO implement case for copyWithin
console.log("CASE copyWithin from array")

var array2 = ['a', 'b', 'c', 'd', 'e'];

// Copy to index 0 the element at index 3
console.log(array2.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array2.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]



