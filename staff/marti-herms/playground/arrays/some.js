console.log('TEST some');

console.log('CASE check if function is true for any array element');

var array = [1, 2, 3, 4, 5];

var array2 = [1, 3, 5, 7];

var even = (element) => element % 2 === 0;

console.log(array.some(even));
//true

console.log(array2.some(even));
//false