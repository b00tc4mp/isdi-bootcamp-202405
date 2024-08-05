
// TODO implement case for copyWithin
console.log('CASE copyWithin')

var letters = ['a', 'b', 'c', 'd', 'e'];

console.log(letters.copyWithin(0, 3, 4));
//["d", "b", "c", "d", "e"]

console.log(letters.copyWithin(1, 3));
//["d", "d", "e", "d", "e"]

