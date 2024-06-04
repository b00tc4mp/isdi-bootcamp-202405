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

    for (var i = 0; i < arguments.length; i++) {

        var argument = arguments[i]

        for (var j = 0; j < argument.length; j++) {

            var elem = argument[j]

            newObject[newObject.length++] = elem

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

animals.join = function () {

    //var res = ''

    //var elem = this[0]
    //res += elem + ',' // Dodo,

    //var elem = this[1]
    //res += elem + ',' // Dodo,Tiger

    //var elem = this[2]
    //res += elem + ',' // Dodo,Tiger,Penguin

    //var elem = this[3]
    //res += elem + ',' // Dodo,Tiger,Penguin,Dodo

    //var elem = this[4]
    //res *= elem //Dodo,Tiger,Penguin,Dodo,Elephant

    //return res

    var res = ""

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        // res += elem + (i < this.length - 1? ',' : '')   ! mejor el de abajo!

        res += elem

        if (i < this.length - 1)
            res += ','

    }

    return res
}



var animals1 = animals.join()

console.log(animals1)
// Dodo,Tiger,Penguin,Dodo,Elephant

console.log('CASE join elements with separator $')

var things = { 0: true, 1: 'hello world', 2: 100, 3: { name: 'Oswald' }, 4: [10, 20, 30], 5: function () { }, length: 6 }

things.join = function (separator) {
    if (separator === undefined)
        separator = ','

    var res = ""

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res += elem

        if (i < this.length - 1)
            res += separator

    }

    return res
}


var joined = things.join(' $ ')

console.log(joined)
//true $ hello world $ 100 $ {object Object} $ 10,20,30 $ function () { }

/*
console.log('CASE includes in objects')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }

numeros.includes = function (num) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === num)
            return true
    }
    return false
}

var numeros1 = numeros.includes(11)

console.log(numeros1)
//false
*/

console.log('TEST object includes pet')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

console.log(pets)

pets.includes = function (element) {
    for (i = 0; i < this.length; i++)
        var elem = this[i]

    if (elem === element)
        return true

    return false
}

var included = pets.includes('dog')



console.log('TEST object includes color from index')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'skyblue', 7: 'red', 8: 'white', 9: 'black', 10: 'grey', length: 11 }

colors.includes = function (element, index) {
    if (index === undefined)
        index = 0

    else if (index < 0)
        index = this.length + index

    for (i = index; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true
    }
    return false
}

var included = colors.includes('pink', 2)

console.log(included)



console.log('CASE reverse in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.reverse = function () {
    var tmp
    for (var i = 0; i < this.length - i; i++) {
        tmp = this[i]

        this[i] = this[this.length - i - 1]

        this[this.length - i - 1] = tmp
    }

    return this

}

var animals1 = animals.reverse()

console.log(animals)
console.log(animals1)
console.log(animals)



console.log('CASE shift in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.shift = function () {

    var deletedAnimal = this[0]

    this.length--

    for (var i = 0; i < this.length; i++) {

        this[i] = this[i + 1]

    }

    delete this[this.length]

    return deletedAnimal
}

var animals1 = animals.shift()

console.log(animals1)
// Dodo
console.log(animals)



console.log('CASE slice in objects')

var barcelona = { 0: 'sagrada', 1: 'montjuic', 2: 'wella', 3: 'beach', 4: 'agbar', length: 5 }

barcelona.slice = function (fromIndex, endIndex) {

    if (endIndex === undefined)
        endIndex = this.length

    else if (endIndex < 0)
        endIndex = this.length + endIndex

    if (fromIndex === undefined)
        fromIndex = this.length + fromIndex

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex


    var newObject = { length: 0 }
    for (var i = fromIndex; i < endIndex; i++) {
        newObject[newObject.length++] = this[i]

    }
    return newObject
}


console.log(barcelona.slice(2))
console.log(barcelona.slice(0))
console.log(barcelona.slice(-2, -1))



console.log('CASE copyWithin in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Pengui', 3: 'Dodo', 4: 'Elephant', length: 5 }



console.log('CASE indexOf in object')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (searchElement, fromIndex) {
    /*
        var element = this[0]
        if (searchElement === element)
            return 0
        var element = this[1]
        if (searchElement === element)
            return 1
        var element = this[2]
        if (searchElement === element)
            return 2
        var element = this[3]
        if (searchElement === element)
            return 3
        var element = this[4]
        if (searchElement === element)
            return 4
    
        return -1
            */
    if (fromIndex === undefined)
        index = 0

    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex

        if (fromIndex < 0)
            fromIndex = 0
    }

    for (var i = fromIndex; i < this.length; i++) {
        var element = this[i]

        if (searchElement === element)
            return i
    }

    return -1

}

var index = animals.indexOf('ant')
console.log(index)
console.assert(index === 0, 'index is 0')

var index = animals.indexOf('giraffe')
console.log(index)
console.assert(index === -1, 'index is -1')

var index = animals.indexOf('bison')
console.log(index)
console.assert(index === 1, 'index is 1')

console.log(animals.indexOf('camel', 1))
//2

var index = animals.indexOf('bison', -3)
console.log(index)
console.assert(index === 4, 'index is 4')



console.log('CASE lastIndexOf in object')

var pets = { 0: 'dog', 1: 'cat', 2: 'bird', 3: 'turtle', 4: 'bird', length: 5 }

pets.lastIndexOf = function (searchElement, fromIndex) {

    if (fromIndex === undefined)
        fromIndex = this.length - 1

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var element = this[i]
        if (searchElement === element)
            return i
    }
    return -1
}


var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)


console.log('CASE copyWithin in objects')


var letters = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 };

letters.copyWithin = function (target, start, end) {
    if (end === undefined)
        end = this.length

    else if (end < 0)
        end = this.length + end


    if (start === undefined)
        start = 0

    else if (start < 0)
        start = this.length + start

    if (end <= start)
        return this

    if (target === undefined)
        target = 0

    else if (target < 0)
        target = this.length + target

    else if (target > start)
        return this

    var temporal = target;
    for (var i = start; i < end; i++) {
        this[temporal] = this[i]
        temporal++
    }
    return this
}



console.log(letters.copyWithin(0, 3, 4));
//{"d", "b", "c", "d", "e"}

console.log(letters.copyWithin(1, 3));
//{"d", "d", "e", "d", "e"} 
