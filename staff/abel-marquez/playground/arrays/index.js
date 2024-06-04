console.log('TEST arrays')
console.log('CASE add elements to array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.log(a)

console.log('CASE remove last element from array')

var a = new Array

a [0] = 10
a [1] = 20
a [2] = 30

console.log(a)
// [10,20,30]

a.length = a.length -1



console.log(a)

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

colors.length -= 2

console.log(colors)
// [red,blue]

console.log(colors.length)
//2


console.log('CASE push an element to array')

var cars = new Array

cars[0] = {brand: 'ferrari', model:'gto', year:1990}
cars[1] = {brand:'lamborghini',model:'murcielago', year:2010}
cars[2] = {brand : 'fiat', model: '500', year: 2017}

console.log(cars)
// [{...},{...},{...}]
console.log(cars.length)
//3

var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// [{...},{...},{...},{....}]
console.log(cars.length)
//4

console.log(count)
//4

cars [0] = {brand:'ferrari',model: 'gto', year:1990}
cars [1] = {brand:'lamborghini',model:'murcielago',year:2010}
cars [2] = {brand:'fiat', model:'500',year:2017}
cars [3] = {brand: 'ford', model: 'fiesta', year:2005}

console.log(cars)

cars.pop()

console.log(cars)

console.log(cars.length)
//4
console.log(count)
//4

console.log('CASE push many elements to array')

var animals = ['pigs','goats','sheep','cows' ]

console.log(animals)
// ['pigs'...]
console.log(animals.length)
//4

var count = animals.push('chickens','cats','dogs')

console.log(animals)
//['pigs'...'dogs']
console.log(animals.length)
//7
console.log(count)
//7

console.log('CASE pop the last element from array')

var cars = new Array 


cars [0] = {brand:'ferrari',model: 'gto', year:1990}
cars [1] = {brand:'lamborghini',model:'murcielago',year:2010}
cars [2] = {brand:'fiat', model:'500',year:2017}

console.log(cars)
//[{...}...]
console.log(cars.length)
// 3

var last = cars.pop()

console.log(cars)
//[{...},{...}]
console.log(cars.length)
//2

console.log(last)
// {brand:'first',....}

console.log('CASE element at index')

var nums = [5,12,8,130,44]

console.log(nums)
//[5,12,8,130,44]

console.log(nums.length)
//5

var num = nums.at(3)

console.log(num)
//130

var num = nums.at(0)

console.log(num)
//5

var num = nums.at(-3)
//8

var num = nums.at(100)

console.log(num)
//undefined

console.log('CASE concat elements from two arrays')

var chars1 = ['a','b','c']
var chars2 = ['d','e','f']

console.log(chars1)
//['a','b','c']

console.log(chars2)
//['d','e','f']

var chars3 = chars1.concat(chars2)

console.log(chars3)
// ['a','b','c','d','e','f']

console.log('CASE concat elements from 5 arrays')

var nums1 = [10,20,30]
var nums2 = [400,500]
var nums3 = [-60,-70]
var nums4 = [800,900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2,nums3,nums4,nums5)

console.log(nums1)
//[10,20,30]
console.log(nums2)
//[400,500]
console.log(nums3)
//[-60,-70]
console.log(nums4)
//[800,900]
console.log(nums5)
//[-1000]
console.log(nums6)
//[10,20,30,400,500,-60,-70,800,900,-1000]

// TODO implement case for join//
// TODO implement case for includes//
// TODO implement case for indexOf//
// TODO implement case for lastIndexOf//
// TODO implement case for slice//
// TODO implement case for reverse //
// TODO implement case for shift //
// TODO implement case for copyWithin //


console.log('CASE indexOf')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']

console.log(index1)
//[10,20,30,40,50]
console.log(index1.length)
//5

console.log(index3.indexOf(-3))
//2

console.log(index4)
//['hola',...]
console.log(index4.length)
//6
console.log(index4.indexOf('hola'))
//0
console.log(index4.indexOf('hola',2))
//5
console.log(index4.indexOf('nohay'))
//-1
console.log(index4.indexOf('buenas',3))
// -1 (porque empieza a contar desde el indice 3, que seria 7. Como 'buenas' va antes pues no lo pilla. -1)

console.log('CASE lastIndexOf')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']

console.log(index2.lastIndexOf(70))
//1
console.log(index4.lastIndexOf('hola',2))
//0
console.log(index3.lastIndexOf(6,2))
//-1
console.log(index3.lastIndexOf(-2,1))
//1

var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index5.lastIndexOf(7))
//7
console.log(index5.lastIndexOf(3,5))
//1

console.log(index5.lastIndexOf(1,-3))
//2


console.log('CASE slice()') // (start,end) 

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index1.slice(1,4))
//[20,30,40] (coge la posicion indice 1 que es 20 y el 4 que es 50 no lo pone pero lo anterior si.)
console.log(index4.slice(-4,-2))
//['buenas,7]
console.log(index5.slice(2,-1))
// [1,6,7,2,2,7]

console.log('CASE shift()') // remueve el 1 elemento de la array y lo devuelve.

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

var index6 = index1.shift()

console.log(index6)
// 10
console.log(index1)
// [20,30,40,50]


console.log('CASE .includes()')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index1.includes(20))
// true
console.log(index2.includes(7))
// false
console.log(index4.includes(7,4))
// false (es false ya que en la posicion 4 que es 8 hacia adelante no hay ningun 7)
console.log(index4.includes('hola',2))
//true
console.log(index4.includes('hola',-1))
//true

console.log('CASE reverse')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

var index7 = index1.reverse()

console.log(index7)
//[50,40,30,20,10]
console.log(index1)
//[50,40,30,20,10]

console.log(index7.reverse())
//[10,20,30,40,50]

console.log(index4.reverse())
//['hola',8,7...]

var index5 = index7.reverse()

console.log(index5.reverse())
// [10,20,30,40,50]


console.log('CASE for copyWithuin()') // (target,start,end)

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index5.copyWithin(1,3,4))
//[1,6,1,6,7,2,2,7,6]

console.log(index4.copyWithin(2,5))
// REPASAARR ['hola',7,8]

console.log('CASE for join()')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]


console.log(index1.join())
//10,20,30,40,50
console.log(index4.join('-'))
// 'hola'-'adios'...
console.log(index4.join('""'))
//"hola"
// REPASARER