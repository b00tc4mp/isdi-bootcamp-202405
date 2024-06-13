console.log('TEST Array.prototype.keys');

console.log('CASE extract the keys of an array');

var array = ['a', 'b', 'c', 'd'];

var iterator = array.keys();

console.assert(iterator.next().value === 0, 'iterator at 0 is 0');
console.assert(iterator.next().value === 1, 'iterator at 1 is 1');
console.assert(iterator.next().value === 2, 'iterator at 2 is 2');