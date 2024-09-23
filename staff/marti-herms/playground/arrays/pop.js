console.log('TEST pop')

console.log('CASE pop an element of array');

var cars = new Array;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };

console.log(cars);
//[{...},{...}{...}]
console.log(cars.length);


console.log(cars.pop());

console.log(cars)

console.log(cars);
//[{...},{...}]
console.log(cars.length);
//2