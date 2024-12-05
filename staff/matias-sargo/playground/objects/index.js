console.log('TEST objects')

console.log('CASE add elements to object')

var o = new Object // {}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3 }

console.log('CASE remove last element from object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3 }

delete o[2]
// o.length = o.length - 1
// o.length -= 1
o.length--

console.log(o)
// { 0: 10, 1: 20, length: 2 }

console.log('CASE remove last 2 elements from object')

var colors = new Object

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'
colors.length = 4

console.log(colors)
// { 0: red, 1: green, 2: blue, 3: yellow, length: 4 }

delete colors[3]
delete colors[2]
// colors.length = colors.length - 2
colors.length -= 2

console.log(colors)
// { 0: red, 1: green, length: 2 }

console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

cars.push = function (element) {
    this[this.length] = element
    this.length++ // o tambíen se puedo optar por "return ++this.length

    return this.length
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4

console.log('CASE push many elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 4: 'cows', length: 4 }

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

// animals.push = function (element1, element2, element3) {
//     this[this.length++] = element1
//     this[this.length++] = element2
//     this[this.length++] = element3

//     return this.length
// }

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]

        this[this.length++] = argument
    }

    return this.length
}

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length)
// 7
console.log(count)
// 7


console.log("CASE delete last element from object")

var bikes = new Object

bikes[0] = { brand: "ducati", model: "multistrada", year: 2018 }
bikes[1] = { brand: "ktm", model: "duke", year: 2012 }
bikes[2] = { brand: "bmw", model: "gs", year: 2008 }
bikes.length = 3

console.log(bikes)

console.log(bikes.length)

bikes.pop = function () {
    if (this.length > 0) {
        var lastElement = this[this.length - 1];
        delete this[this.length - 1];
        this.length--;
        return lastElement;
    }
    return undefined;
}

console.log(bikes.pop())

console.log(bikes)

console.log(bikes.length)

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
//130

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

console.log('CASE concat elements from 5 objects')

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 }
var nums2 = { 0: 400, 1: 500, length: 2 }
var nums3 = { 0: -60, 1: -70, length: 2 }
var nums4 = { 0: 800, 1: 900, length: 2 }
var nums5 = { 0: -1000, length: 1 }

nums1.concat = function () {

    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        newObject[newObject.length++] = elem
    }

    for (var j = 0; j < arguments.length; j++) {

        for (var h = 0; h < arguments[j].length; h++) {

            var argument = arguments[j][h]

            newObject[newObject.length++] = argument
        }

    }

    return newObject
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

console.log("implement case for join")

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };

/*elements.join = function () {
    var separator = '';

    for (var i = 0; i < this.length; i++) {
        comillas += this[i];
        if (i < this.length - 1) {
            comillas += coma;
        }
    }

    return comillas;
};

console.log(elements.join())
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"

console.log("implement case for includes")

var number = { 0: 1, 1: 2, 2: 3, length: 4 };

number.includes = function (num) {
    for (var key in this) {
        if (this[key] === num) {
            return true;
        }
    }
    return false;
};

console.log(number.includes(2));
// Expected output: true

var pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false

console.log("implement case for indexOf")


const beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };

/*animals.indexOf = function (searchelement, fromIndex) {

    var element = this[0]
    if (searchelement === element)
        return 0
    var element = this[1]
    if (searchelement === element)
        return 1
    var /element = this[2]
    if (searchelement === element)
        return 2
    var element = this[3]
    if (searchelement === element)
        return 3
    var element = this[4]
    if (searchelement === element)
        return 4

    return -1*/
/*if (fromIndex === undefined)
    fromIndex = 0

for (var i = fromIndex; i < this.length; i++) {
    var element = this[i]

    if (searchelement === element)
        return i
}
return -1

}
var index = animals.indexOf("ant")
console.log(index)

console.log(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1*/


// TODO implement case for lastIndexOf

/*console.log("CASE lastIndexOf from array")

var dpets = { 0: "dog", 1: "cat", 2: "bird", 3: "turtle", 4: "snake", legth: 5 }

var lastIndex = dpets.lastIndexOf("bird")
console.log(lastIndex)
//2
var lastIndex = dpets.lastIndexOf("elephant")
console.log(lastIndex)
// -1
*/


// TODO implement case for slice

// TODO implement case for reverse
// TODO implement case for shift
// TODO implement case for copyWithin
