console.log('TEST push')

console.log('CASE push an element to array');

var cars = new Array;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };

console.log(cars);
//[{...},{...}{...}]
console.log(cars.length);

console.log(cars.push({ brand: 'ford', model: 'fiesta', year: 2005 }));

console.log(cars);
//[{...},{...},{...},{...}]
console.log(cars.length);
//4



console.log('CASE push multiple elements to array');

var animals = ['pigs', 'goats', 'sheep', 'cows'];

console.log(animals);
//['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length);
//4

var count = animals.push('chickens', 'cats', 'dogs');

console.log(animals);
//['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length);
//7