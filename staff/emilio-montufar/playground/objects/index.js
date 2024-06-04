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
//cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars['2'] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

//cars.push = function (element) {
cars['push'] = function (element) {
    // TODO add element into `this` object (cars)
    //this[this.length] = element
    this[this.length++] = element

    // this.length = this.length + 1
    //this.length++
    return this.length
    //return this.length++ // WARN
    // return ++this.length
}

//var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
var count = cars['push']({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4
console.log(count)
// 4

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
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs', length: 7 } 
console.log(animals.length)
// 7
console.log(count)
// 7

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

    // delete this[this.length - 1]
    // this.length--
    delete this[--this.length]

    return element
}

var last = cars.pop()

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }

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

console.log('CASE concat elements from two objects')

var chars1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var chars2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 }

console.log(chars1)
// { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.log(chars2)
// { 0: 'd', 1: 'e', 2: 'f', length: 3 }

chars1.concat = function (object) {
    var newObject = { length: 0 } /*  */

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        newObject[newObject.length++] = elem
    }

    for (var i = 0; /* comenzamos por la primera posicion del array*/i < arguments.length /* si la primera posicion del array es menor que el length*/; i++) {
        var elem = arguments[i]

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
    var res = {length: 0}

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res[res.length++] = elem
    }

    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[1]

        for (var j = 0; j < argument.length; j++) {
            var elem = argument[j]

            res[res.length++] = elem
        }
    }
    return res
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

console.log('Case join elements from objects')

var animals = {0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'pigs', length: 5 }

animals.join = function() {
    for( var i = 0; i < this.length; i++){
        var elem = this[i]

        res += elem

        if(i < this.length - 1)
            res += ','
    }
    return res
}



var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

pets.includes = function(element) {
    if (index === undefined)
    index = 0
    for (var i = 0; i < this.length; i++){
        var elem = this[1]

        if (elem === element)
        return true
    }      
    return false
}

var colors = {0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'red', 7: 'skyblue', 8: 'white', length: 9}

colors.includes = function(element, index){
    for (var i = index; i < this.length; i++){
        var elem = this[1]

        if (elem === element)
        return true
    }      
    return false
}

console.log('CASE indexOf to search position in objects')

var animals = {1: 'pigs', 2: 'goats', 3: 'sheep', 4: 'cows', 5: 'pigs', length: 6}

animals.indexOf = function(element){
 //    var elem = this[0]
 //    if (elem === element)
 //       return 0
 //    var elem = this[1]
 //    if (elem === element)
 //        return 1
 //    var elem = this[2]
 //    if (elem === element)
 //        return 2
 //    var elem = this[3]
 //    if (elem === element)
 //        return 3
 //   var elem = this[4]
 //    if (elem === element)
 //        return 4

    for (var i = 0; i < this.length; i++) {
    if (index === undifined)
        index = 0
    else if (index < 0) {
        index = this.length + index

            if (index <0)
                index = 0
    }
    var elem = this[i]

        if (elem === element)
            return i
    }

    return -1
}
var index = animals.indexOf('pigs')

var index = animals.indexOf('elephant')

var index =
