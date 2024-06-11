console.info('TEST fill')

console.info('CASE first')

var numeros = [1, 2, 3, 4];

var num1 = numeros.fill(6);

console.assert(numeros.length === num1.length, 'numeros length is equal to num1 length')
console.assert(num1[0] === 6, 'num1 at 0 is 6')
console.assert(num1[1] === 6, 'num1 at 1 is 6')
console.assert(num1[2] === 6, 'num1 at 2 is 6')
console.assert(num1[3] === 6, 'num1 at 3 is 6')

console.info('CASE second')

var numeros = [1, 2, 3, 4]

var num2 = numeros.fill(5, 1)

console.assert(numeros.length === num2.length, 'numeros length is equal to num1 length')
console.assert(num2[0] === 1, 'num2 at 0 is 1')
console.assert(num2[1] === 5, 'num2 at 1 is 5')
console.assert(num2[2] === 5, 'num2 at 2 is 5')
console.assert(num2[3] === 5, 'num2 at 3 is 5')

console.info('CASE third')

var numeros = [1, 2, 3, 4]

var num3 = numeros.fill(0, 2, 4)

console.assert(numeros.length === num3.length, 'numeros length is equal to num1 length')
console.assert(num3[0] === 1, 'num3 at 0 is 1')
console.assert(num3[1] === 2, 'num3 at 1 is 2')
console.assert(num3[2] === 0, 'num3 at 2 is 0')
console.assert(num3[3] === 0, 'num3 at 3 is 0')