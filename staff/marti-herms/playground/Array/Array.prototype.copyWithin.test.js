console.info('TEST copyWithin')
console.info('CASE copywithin with three items in arrays')


var letters = ['a', 'b', 'c', 'd', 'e'];


var copyLetters = (letters.copyWithin(0, 3, 4));

console.assert(letters.length === 5, 'letters length is 5')
console.assert(letters[0] === 'd', 'letters at 0 is d')
console.assert(letters[1] === 'b', 'letters at 1 is b')
console.assert(letters[2] === 'c', 'letters at 2 is c')
console.assert(letters[3] === 'd', 'letters at 3 is d')
console.assert(letters[4] === 'e', 'letters at 4 is e')

console.info('CASE copywithin with two items of arrays')

var copyLetters = (letters.copyWithin(1, 3));

console.assert(letters.length === 5, 'letters length is 5')
console.assert(letters[0] === 'd', 'letters at 0 is d')
console.assert(letters[1] === 'd', 'letters at 1 is d')
console.assert(letters[2] === 'e', 'letters at 2 is e')
console.assert(letters[3] === 'd', 'letters at 3 is d')
console.assert(letters[4] === 'e', 'letters at 4 is e')