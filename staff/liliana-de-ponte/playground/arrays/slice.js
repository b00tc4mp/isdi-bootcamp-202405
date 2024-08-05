// TODO implement case for slice
console.log('CASE element at slice')

var animals2 = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals2.slice(2));
//["camel", "duck", "elephant"]

console.log(animals2.slice(2, 4));
//["camel", "duck"]

console.log(animals2.slice(1, 5));
//["bison", "camel", "duck", "elephant"]

console.log(animals2.slice(-2));
//["duck", "elephant"]

console.log(animals2.slice(2, -1));
//["camel", "duck"]

console.log(animals2.slice());
//["ant", "bison", "camel", "duck", "elephant"]

