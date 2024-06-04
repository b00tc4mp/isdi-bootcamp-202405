console.log('TEST push')

console.log('CASE push an element to object');

var cars = new Object;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };
cars.length = 3;

console.log(cars);
//{ 0: {...}, 1: {...}, 2: {...}, length: 3}

cars.push = function (element) {
    this[this.length] = element;
    this.length++;
    return this.length;
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 });

console.log(cars);
//{ 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4}
console.log(cars);



console.log('CASE push multiple elements to objects');

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 };

console.log(animals);
//{ 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows' }
console.log(animals.length);
//4

animals.push = function (...element) {
    for (var i = 0; i < element.length; i++) {
        this[this.length] = element[i];
        this.length++;;
    }
    return this.length;
}

var count = animals.push('chickens', 'cats', 'dogs');

console.log(animals);
//{ 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs' }
console.log(animals.length);
//7