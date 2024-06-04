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