console.log('TEST every');

console.log('CASE check if function is true for every array element');

var array = [1, 2, 3, 4, 5];

var array2 = [2, 4, 6, 8];

var even = (element) => element % 2 === 0;

console.log(array.every(even));
//false

console.log(array2.every(even));
//true