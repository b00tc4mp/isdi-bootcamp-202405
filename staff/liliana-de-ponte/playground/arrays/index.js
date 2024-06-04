console.log('TEST arrays')

console.log('CASE add elements to array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)
//[10,20,30]

console.log('CASE remove elements from array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)
//[10,20,30]
console.log(a.length)
//3

//a.length = a.length - 1
//a.length -= 1
a.length--

console.log(a)
//[10,20]
console.log(a.length)
//2

console.log('CASE remove last 2 elements from array')

var colors = new Array

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'

console.log(colors)
//[res, green, blue, yellow]

console.log(colors.length)
//4

//colors.length = colors.length -2
colors.length -= 2

console.log(colors)
//[red, green]
console.log(colors.length)
//2

console.log('CASE push an element to array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

console.log(cars)
//[{...}, {...}, {...}]
console.log(cars.length)
// 3

cars.push({ brand: 'fors', model: 'fiesta', year: 2005 })

console.log(cars)
//[{...}{...}{...}{...}]

console.log(cars.length)
// 4

console.log('CASE push many elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
//['pisg''goats', 'sheep', 'cows']

console.log(animals.length)
//7

var count = animals.push('chickens', 'cats', 'dogs')

console.log(count)
//7

console.log('CASE pop an element to array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

console.log(cars)
//[{...}, {...}, {...}]
console.log(cars.length)
// 2

var last = cars.pop()

console.log(cars)
//[{...}, {...}]

console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }

console.log('CASE element at index')

var nums = [5, 12, 8, 130, 44]

console.log(nums)
// [5, 12, 8, 130, 44]
console.log(nums.lenght)
//5

var num = nums.at(3)
console.log(num)
//130

var num = nums.at(0)
console.log(num)
//8

var num = nums.at(-3)
console.log(num)
//8

var num = nums.at(100)
console.log(num)
//undefined

var num = nums.at(-100)
console.log(num)
//undefined

console.log('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c'];
var chars2 = ['d', 'e', 'f'];

console.log(chars1)
// ['a', 'b', 'c']

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
//[10,20,30]
console.log(nums2)
//[400, 500]
console.log(nums3)
//[-60,-70]
console.log(nums4)
//[800, 900]
console.log(nums5)
//[-1000]

console.log(nums6)
//[10, 20, 30, 400, 500, -60, -70, 800, 900, -1000]

// TODO implement case for indexOf
console.log('CASE element at indexOf')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(animals)
//['ant', 'bison', 'camel', 'duck', 'bison']

console.log(animals.indexOf('bison'))
// 1

console.log(animals.indexOf('camel'))
//2

console.log(animals.indexOf('bison', 2))
//4

// TODO implement case for includes
console.log('CASE array includes nums')

var nums = [10, 20, 30, 40];

console.log(nums)
//[10, 20, 30, 40]

console.log(nums.includes(10))
//true

console.log(nums.includes(20))
//true

console.log(nums.includes(15))
//false


console.log('TEST array includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)
console.log(included)
//true

var included = colors.includes('red', 4)
console.log(included)
//false

var included = colors.includes('red', 8)
console.log(included)
//false

var included = colors.includes('orange')
console.log(included)
//true

var included = colors.includes('orange', undefined)
console.log(included)
//true

var included = colors.includes('black', -4)
console.log(included)
//true



// TODO implement case for reverse
console.log('CASE element at Reverse')

var nums = ['one', 'two', 'three'];

console.log(nums)
//['one', 'two', 'three']

console.log(nums.reverse())
//['three', 'two', 'one']

console.log(nums)
//['three', 'two', 'one']

// TODO implement case for join
console.log('CASE join elements from array')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements)
//['Fire', 'Air', 'Water']

console.log(elements.join());
//"Fire,Air,Water"

console.log(elements.join(''));
//"FireAirWater"

console.log(elements.join('-'));
//"Fire-Air-Water"

console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')

console.log(joined)
//true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }


// TODO implement case for lastIndexOf
console.log('CASE element at lastIndexOf')

var zoo = ['Giraffe', 'Tiger', 'Penguin', 'Giraffe'];

console.log(zoo.lastIndexOf('Giraffe'));
//3

console.log(zoo.lastIndexOf('Tiger'));
//1

console.log(zoo.lastIndexOf('Giraffe', 2));
//0

console.log(zoo.lastIndexOf('Giraffe', -2));
//0






// TODO implement case for shift
console.log('CASE element at shift')

var names1 = ["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"];

console.log(names1)
//["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"]

console.log(names1.length)
//5

var newNames1 = names1.shift()

console.log(newNames1)
//["Andrew"]

console.log(names1)
//["Tyrone", "Paul", "Maria", "Gayatri"]

console.log(names1.length)
//4

// TODO implement case for slice
console.log('CASE element at slice')

var animals2 = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals2.slice(2));
//["camel", "duck", "elephant"]

console.log(animals2.slice(2, 4));
//["camel", "duck"]

console.log(animals2.slice(1, 5));
//["bison", "camel", "duck", "elephant"]

console.log(animals2.slice(-2));
//["duck", "elephant"]

console.log(animals2.slice(2, -1));
//["camel", "duck"]

console.log(animals2.slice());
//["ant", "bison", "camel", "duck", "elephant"]


// TODO implement case for copyWithin
console.log('CASE copyWithin')

var letters = ['a', 'b', 'c', 'd', 'e'];

console.log(letters.copyWithin(0, 3, 4));
//["d", "b", "c", "d", "e"]

console.log(letters.copyWithin(1, 3));
//["d", "d", "e", "d", "e"]

