console.log('TEST objects')

console.log('CASE add elements to object')

var o = new Object // {}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// {0: 10, 1: 20, 2: 30, length: 3}

//-------------------------------------------------------------------------------------

console.log('CASE remove last element from object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
//{0: 10, 1: 20, 2: 30, length: 3}

delete o[2]
// o.length = o.length - 1
// o.length -= 1
o.length--

console.log(o)

//{0: 10, 1: 20, length: 2}

//-------------------------------------------------------------------------------------

console.log('CASE remove last 2 elements from object')

var colors = new Object

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'
colors.length = 4

console.log(colors)
// {0: red, 1: green, 2: blue, 3: yellow, length 4}

delete colors[3]
delete colors[2]
// colors.length = colors.lengh - 2
colors.length -= 2

console.log(colors)
// {0: red, 1: green, length 2}

//-------------------------------------------------------------------------------------

console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// {0: {...}, 1: {...}, 2:{...}, length: 3}
console.log(cars.length)
// 3

cars.push = function (element) {

    this[this.length] = element
    this.length++
    //return ++this.length es igual que primero hacer esto: this.length++ y despues retornar this.length
    return this.length

}

//var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
var count = cars['push']({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4
console.log(count)
// 4

//-------------------------------------------------------------------------------------

console.log('CASE push multiple elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

// animals.push = function (element1, element2, element3) {
//     this[this.length++] = element1
//     this[this.length++] = element2
//     this[this.length++] = element3

//     return this.length
// } esto no permite que se vaya modificando

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]

        this[this.length++] = argument
    }

    return this.length
}

//-------------------------------------------------------------------------------------

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs', length: 7 }
console.log(animals.length)
// 7
console.log(count)
// 7

//-------------------------------------------------------------------------------------

console.log('CASE pop the last element from object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

cars.pop = function () {
    var element = this[this.length - 1]

    //delete this[--this.length] esto es lo mismo que delete this[this.length - 1] y despues poner  this.length--


    return element
}

var last = cars.pop()

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }

//-------------------------------------------------------------------------------------

console.log('CASE element at index')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(nums)
// [5, 12, 8, 130, 44]
console.log(nums.length)
// 5

nums.at = function (index) {
    //if (index >= 0)
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]
}

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

//-------------------------------------------------------------------------------------

console.log('CASE concat elements from two objects')

var chars1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var chars2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 }

console.log(chars1)
// { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.log(chars2)
// { 0: 'd', 1: 'e', 2: 'f', length: 3 }

chars1.concat = function (object) {
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        newObject[newObject.length++] = elem
    }

    for (var i = 0; i < object.length; i++) {
        var elem = object[i]

        newObject[newObject.length++] = elem
    }

    return newObject
}

var chars3 = chars1.concat(chars2)

console.log(chars1)
// { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.log(chars2)
// { 0: 'd', 1: 'e', 2: 'f', length: 3 }
console.log(chars3)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

//-------------------------------------------------------------------------------------

console.log('CASE concat elements from 5 objects')

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 }
var nums2 = { 0: 400, 1: 500, length: 2 }
var nums3 = { 0: -60, 1: -70, length: 2 }
var nums4 = { 0: 800, 1: 900, length: 2 }
var nums5 = { 0: -1000, length: 1 }

nums1.concat = function () {
    var newObject = { length: 0 }

    for (let i = 0; i < this.length; i++) {

        for (var k = 0; k < this.length; k++) {

            var elem = this[k]

            newObject[newObject.length++] = elem
        }

        for (var h = 0; h < arguments.length; h++) {

            for (var j = 0; j < arguments[h].length; j++) {

                var argument = arguments[j][h]

                newObject[newObject.length++] = argument
            }
        }

        return newObject

    }

}

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
// { 0: 10, 1: 20, 2: 30, length: 3 }
console.log(nums2)
// { 0: 400, 1: 500, length: 2 }
console.log(nums3)
// { 0: -60, 1: -70, length: 2 }
console.log(nums4)
// { 0: 800, 1: 900, length: 2 }
console.log(nums5)
// { 0: -1000, length: 1 }

console.log(nums6)
// { 0: 10, 1: 20, 2: 30, 3: 400, 4: 500, 5: -60, 6: -70, 7: 800, 8: 900, 9: -1000, length: 10 }

//-------------------------------------------------------------------------------------

console.log('CASE implement Method.join()')

var trees = { 0: 'palm', 1: 'cedar', 2: 'oak', length: 3 }

trees.join = function (separator) {

    var result = '';

    if (separator === undefined) {

        separator = ','
    }

    for (var index = 0; index < this.length; index++) {

        result += this[index]

        if (index < this.length - 1) {

            result += separator

        }
    }

    return result;
}

console.log(trees.join('-'))
// 'palm-cedar-oak'
console.log(trees.join())
//'palm,cedar,oak
console.log(trees.join(''))
//'palmcedaroak'

//-------------------------------------------------------------------------------------

console.log('CASE implement Method.includes()')

var pokemonName = { 0: 'eevee', 1: 'pikachu', 2: 'bulbasur', length: 3 }

pokemonName.includes = function (item) {

    for (var index = 0; index < this.length; index++) {

        if (item === this[index]) {

            return true
        }
    }

    return false
}

console.log(pokemonName.includes(3))
//false
console.log(pokemonName.includes('bulbasur'))
//true

//-------------------------------------------------------------------------------------

console.log('CASE implement Method.indexOf()') // ME FALTA QUE COJA OTRO PARAMETRO

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (item) {

    for (var index = 0; index < this.length; index++) {

        if (item === animals[index]) {

            return index

        }

    }

    return -1

}

console.log(animals.indexOf('camel'))
//2
console.log(animals.indexOf('bison'))
//1
console.log(animals.indexOf('pig'))
//-1

//-------------------------------------------------------------------------------------

console.log('CASE Method lastIndexOf()') // ME FALTA QUE COJA OTRO PARAMETRO

var cities = { 1: 'madrid', 2: 'barcelona', 3: 'leon', 4: 'madrid', length: 4 }

cities.lastIndexOf = function (item) {

    for (var index = this.length; index > 0; index--) {

        if (item === this[index]) {

            return index - 1
        }
    }
    return -1
}

console.log(cities.lastIndexOf('leon'))
//2
console.log(cities.lastIndexOf('pamplona'))
// -1
console.log(cities.lastIndexOf('madrid'))
//3

//-------------------------------------------------------------------------------------

console.log('CASE implement Method.reverse()')

var flowers = { 0: 'rose', 1: 'geraniem', 2: 'lily', 3: 'tulyp', length: 4 }

flowers.reverse = function () {

    var newObject = { length: 0 }

    for (var index = this.length - 1; index >= 0; index--) {

        var flower = this[index]

        newObject[newObject.length++] = flower

    }

    return newObject

}

console.log(flowers.reverse())

//-------------------------------------------------------------------------------------

console.log('CASE shift first element from objects')

var names = { 0: 'laura', 1: 'juan', 2: 'nuria', 3: 'jose', 4: 'jesus', length: 5 }

names.shift = function () {

    var deletedName = this[0]

    for (var index = 0; index < this.length - 1; index++) {

        this[index] = this[index + 1]

    }
    delete this[this.length - 1]
    this.length--;

    return deletedName
}

console.log(names.shift())
// 'laura'
console.log(names)
// {0: 'juan', 1: 'nuria', 2: 'jose', 3: 'jesus', length: 4}

//-----------------------------------------------------------------------

console.log('CASE Method.slice()')

var metalBands = { 0: 'iron maiden', 1: 'metallica', 2: 'stratovarius', 3: 'helloween', 4: 'scorpions', length: 5 }

metalBands.slice = function (item1, item2) {

    var newObject = { length: 0 }

    for (var index = item1; index < this.length - 1; index++) {



    }

}