console.log('TEST indexOf')

console.log('CASE first index of element in array');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
//1

console.log(beasts.indexOf('bison', 2));
//4

console.log(beasts.indexOf('giraffe'));
//-1