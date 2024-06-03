console.log('TEST object')

console.log('CASE add elements to object')

var o = new Object // {}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3 }

console.log('CASE remove last element from Object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
// { 0: 10, 1: 20, 2: 30, length: 3}

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
// { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }

delete colors[3]
delete colors[2]
// colors.length = colors.length - 2
colors.length -= 2

console.log(colors)
// { 0: 'red', 1: 'green', length: 2 }

console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiesta', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

/*cars.push = function (element) {
    // TODO add element into `this` object (cars)
    this[3] = element
    this.length += 1
    delete this.push
    return this
}*/

cars.push = function (element) {
    // TODO add element into `this` object (cars)
    this[this.length] = element
    this.length++ //no return
}


cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4

console.log('CASE push many elements from object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 7 }

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 7 }
console.log(animals.length)
// 4

/*animlas.push = function(element1, element2, element3) {
    this[this.length++] = element1
    this[this.length++] = element2
    this[this.length++] = element3
    return this.length
    
}*/

animals.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length++] = argument
    }
    return this.length
}

var count = animals.push('chicken', 'cats', 'dogs')

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chicken', 5: 'cats', 6: 'dogs', length: 7 }
console.log(animals.length)
// 7
console.log(count)
// 7

console.log('CASE pop the last element from array')

cars.pop = function () {
    // TODO remove element into `this` object (cars)
    delete this[this.length - 1]
    this.length -= 1
    return this.length
}
cars.pop()

//CORRECTA
/*cars.pop = function () {
    var lastElement = this[this.length - 1]
    
    //delete this[this.length - 1]
    this.length--

       O delete this[--this.length]//

    return lastElement
}
cars.pop()*/

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

console.log('CASE element at index')

var numeros = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(numeros)
// { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
console.log(numeros.length)
// 5

numeros.at = function (index) {
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]

}

var num = numeros.at(3)

console.log(num)
// 130

var num = numeros.at(-3)

console.log(num)
// 8

console.log('CASE concat elements from two objects')

var chars1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var chars2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 }

console.log(chars1)
// { 0: 'a', 1: 'b', 2: 'c', length: 3}
console.log(chars2)
// { 0: 'd', 1: 'e', 2: 'f', length: 3}

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
// { 0: 'a', 1: 'b', 2: 'c', length: 3}
console.log(chars2)
// { 0: 'd', 1: 'e', 2: 'f', length: 3}
console.log(chars3)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

console.log('CASE concat elements from 5 objects')

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 }
var nums2 = { 0: 400, 1: 500, length: 2 }
var nums3 = { 0: -60, 1: -70, length: 2 }
var nums4 = { 0: 800, 1: 900, length: 2 }
var nums5 = { 0: -1000, length: 1 }

nums1.concat = function () {
    // TODO implement me (USE this, arguments)
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

// TODO implement case for indexOf

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (animalName) {
    for (var i = 0; i < animals.length; i++) {
        if (animalName === animals[i]) {
            return i
        }
    }
    return -1
}


var indexAnimal = animals.indexOf('camel')

console.log(indexAnimal)
// 2

/* TODO implement case for indexOf WITH TWO PARAMETERS

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (animalName, index) {
    if (index > -1) {
        for (var i = index; i < animals.length; i++) {
            if (animals[i] === animalName) {
                return i
            }
        }
        return -1
    } else if (index < 0)

        return -1
}


var indexAnimal = animals.indexOf('camel', 1)

console.log(indexAnimal) // in progress*/


console.log('CASE join in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

animals.join = function (obje, separetor) {
    var newObject = ""
    for (var i = 0; i < obje.length; i++) {
        var elem = obje[i] + separetor

        newObject += elem

    }
    return newObject
}

var animals1 = animals.join(animals, " + ")

console.log(animals1)
77

console.log('CASE includes in objects')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }

numeros.includes = function (num) {
    for (var i = 0; i < this.length; i++) {
        if (i === num)
            return true
    }
    return false
}

var numeros1 = numeros.includes(11)

console.log(numeros1)
//false


console.log('CASE reverse in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.reverse = function () {
    var newObject = { length: 0 }
    for (var i = this.length - 1; i >= 0; i--) {
        var animalsReverse = this[i]

        newObject[newObject.length++] = animalsReverse
    }
    return newObject
}

var animals1 = animals.reverse()

console.log(animals1)

console.log('CASE shift in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.shift = function () {

    var deletedAnimal = this[0]
    delete this[0]

    this.length -= 1

    return deletedAnimal
}

var animals1 = animals.shift()

console.log(animals1)
// Dodo


console.log('CASE slice in objects')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }

animals.slice = function (n1, n2) {
    var newObject = { length: 0 }

    n2 = this.length

    for (var i = 0; i < this.length; i++)
        var animal = this[i]

    newObject[newObject.length++] = animal

    return newObject
}

var animals1 = animals.slice(0, 3)

console.log(animals1)


console.log('CASE copyWithin in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Pengui', 3: 'Dodo', 4: 'Elephant', length: 5 }


