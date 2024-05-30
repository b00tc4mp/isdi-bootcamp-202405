console.log('TEST arrays');

console.log('CASE add elements to array');

var a = new Array;

a[0] = 10;
a[1] = 20;
a[2] = 30;

console.log(a);
//[10, 20, 30]
console.log(a.length);
//3


console.log('CASE remove last element from array');

var a = new Array;

a[0] = 10;
a[1] = 20;
a[2] = 30;

console.log(a);
//[10, 20, 30]
console.log(a.length);
//3

//a.length = a.length - 1;
//a.length -= 1;
a.length--;

console.log(a);
// [10, 20] 
console.log(a.length);
//2

console.log('CASE remove last 2 elements from array');

var colors = new Array;

colors[0] = 'red';
colors[1] = 'green';
colors[2] = 'blue';
colors[3] = 'yellow';

console.log(colors);
//[res, green, blue, yellow]
console.log(colors.length);
//4

//colors.length = colors.length -2;
colors.length -= 2;

console.log(colors);
//[red, green]
console.log(colors.length);
//2

console.log('CASE push and pop an element to array');

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

console.log(cars.pop());
console.log(cars)