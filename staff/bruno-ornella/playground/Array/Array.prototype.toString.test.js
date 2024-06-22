console.info('CASE toString in array')

console.info('TEST array.prototype.toString')

var string = [1, 2, 'a', '1a'];

var arrayString = string.toString()

console.assert(string instanceof Array, 'string is an Array')
console.assert(arrayString === '1,2,a,1a', 'arrayString is a "1,2,a,1a"')

