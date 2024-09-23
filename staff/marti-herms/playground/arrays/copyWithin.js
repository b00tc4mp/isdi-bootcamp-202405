console.log('TEST copyWithin')

console.log('CASE copy fragment of array inside of the array');

var array1 = ['a', 'b', 'c', 'd', 'e'];

console.log(array1);
//['a', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(0, 3, 4));
//['d', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(1, 3));
//['d', 'd', 'e', 'd', 'e']