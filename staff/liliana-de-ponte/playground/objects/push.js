console.log('TEST push')

console.log('CASE push an element to object')
var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1900 }
cars[1] = { brand: 'lamborguini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
//{0: {...}, 1: {...}, 2:{...}, length: 3}
console.log(cars.length)
//3

cars.push = function (element) {
    //TODO add element into `this` objects (cars)
    this[this.length] = element
    //this.length++
    //return this.length
    return ++this.length;
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 });

console.log(cars)
//{0: {...}, 1:{...}. 2:{...}, length: 4}

console.log(cars.length)
//4

console.log('CASE push many elements to array')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }
animals.length = 4

console.log(animals)
//['pigs','goats','sheep','cows']

console.log(animals.length)
//4

//TODO implement animals.push

//animals.push = function (newAnimal1, newAnimal2, newAnimal3) {
//this[this.length++] = newAnimal1;
//this[this.length++] = newAnimal2;
//this[this.length++] = newAnimal3;
//return this.length
//}

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]
        this[this.length++] = argument
    }
    return this.length
}

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
//[{pisg','goats','sheep', 'cows','chickens', 'cats', 'dogs'}

console.log(animals.length)
//7

console.log(count)
//7
