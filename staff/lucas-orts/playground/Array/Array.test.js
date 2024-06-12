console.info('TEST constructor')

console.info('CASE builds a new instance of Array')

var a = new Array // new Array() // []

console.assert(a instanceof Array, 'a is an Array')
console.assert(a instanceof Object, 'a is an Object')


console.info('CASE builds a new Array with values')

var a = new Array(10, 20, 30) // [10, 20, 30]

console.assert(a instanceof Array, 'a is an Array')
console.assert(a[0] === 10, 'a at 0 is 10')
console.assert(a[1] === 20, 'a at 1 is 20')
console.assert(a[2] === 30, 'a at 2 is 30')
console.assert(a.length === 3, 'a length is 3')


console.info('CASE builds a new Array with only one numeric argument')

var a = new Array(10)

console.assert(a instanceof Array, 'a is an Array')
console.assert(a.length === 10, 'a length is 10')


console.info('CASE builds a new Array with only one non-numeric argument')

var a = new Array('hola mundo')

console.assert(a instanceof Array, 'a is an Array')
console.assert(a[0] === 'hola mundo', 'a at 0 is hola mundo')
console.assert(a.length === 1, 'a length is 1')


console.info('CASE builds a new Array with two values')

var a = new Array(10, 20)

console.assert(a instanceof Array, 'a is an Array')
console.assert(a[0] === 10, 'a at 0 is 10')
console.assert(a[1] === 20, 'a at 1 is 20')
console.assert(a.length === 2, 'a length is 2')
