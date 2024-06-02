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
//-----------------------------------------------------------
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
//----------------------------------------------------------
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
//--------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------
console.log('CASE push many elemts to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']

console.log(animals.length)
// 4

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
//['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs' ]

console.log(animals.length)
//7

console.log(count)
//['chickens', 'cats', 'dogs' ]

//-------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------

console.log('CASE element at index')

var nums = [5, 12, 8, 130, 44]

console.log(nums)
//[5, 12, 8, 130, 44]
console.log(nums.length)
// 5

var num = nums.at(100)

console.log(num)
// undefinded

var num = nums.at(-100)

console.log(num)
// undefinded

//-----------------------------------------------------------------------------

console.log('CASE concat elements from two arrays')

var char1 = ['a', 'b', 'c']
var char2 = ['d', 'e', 'f']

console.log(char1)
// ['a', 'b', 'c']
console.log(char2)
// ['d', 'e', 'f']

var char3 = char1.concat(char2)

console.log(char1)
// ['a', 'b', 'c']
console.log(char2)
// ['d', 'e', 'f']
console.log(char3)
// ['a', 'b', 'c', 'd', 'e', 'f']

//-------------------------------------------------------------------------

console.log('CASE concat elements from five arrays')

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

//----------------------------------------------------------------------------------------------

console.log('CASE implement join()')

var trees = ['palm', 'cedar', 'oak']

var trees1 = trees.join()
console.log(trees1)
//'palm,cedar,oak'

var trees2 = trees.join("")
console.log(trees2)
//'palmcedaroak'

var trees3 = trees.join("-")
console.log(trees3)
//'palm-cedar-oak'

//-----------------------------------------------------------------------------------

console.log('CASE implement method.includes()')

var pokemonName = ['eevee', 'pikachu', 'bulbasur']

console.log(pokemonName.includes('eevee'))
//true
console.log(pokemonName.includes(8))
//false

//-------------------------------------------------------------------------------------

console.log('CASE implement Method.indexOf()')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(animals.indexOf('ant'))
// 0
console.log(animals.indexOf('duck'))
// 3
console.log(animals.indexOf('dog'))
// -1

console.log(animals.indexOf('ant', 3))
//-1
console.log(animals.indexOf('camel', 2))
// 2

//---------------------------------------------------------------------------------------

console.log('CASE Method lastIndexOf')

var cities = ['madrid', 'barcelona', 'leon', 'madrid']

console.log(cities.lastIndexOf('madrid'))
//3
console.log(cities.lastIndexOf('navarra'))
// -1
console.log(cities.lastIndexOf('leon'))
//2

//----------------------------------------------------------------------------------------

console.log('CASE implement Method.reverse()')

var flowers = ['rose', 'geranium', 'lily', 'tulip']

console.log(flowers.reverse())
// ['tulyp', 'lily', 'geranium', 'rose']

//--------------------------------------------------------------------------------------

console.log('CASE shift first element from array')

var names = ['laura', 'juan', 'nuria', 'jose', 'jesus']

var deletdName = names.shift()

console.log(deletdName)
// 'laura'
console.log(names)
// ['juan', 'nuria', 'jose', 'jesus']

//----------------------------------------------------------------------------------------

console.log('CASE Method.Slice()')

var metalBands = ['iron maiden', 'metallica', 'stratovarius', 'helloween', 'scorpions']

console.log(metalBands.slice(2))
//['stratovarius', 'helloween', 'scorpions']
console.log(metalBands.slice(1, 3))
// ['metallica', 'stratovarius']

//------------------------------------------------------------------------------------------



// TODO implement case for join -----------------------> DONE
// TODO implement case for includes---------------------> DONE
// TODO implement case for indexOf ---------------------> 1/2 DONE
// TODO implement case for lastIndexOf ---------------------> 1/2 DONE
// TODO implement case for slice
// TODO implement case for reverse ----------------------> DONE
// TODO implement case for shift ------------------------> DONE
// TODO implement case for copyWithin