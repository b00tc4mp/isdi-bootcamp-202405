console.log('CASE element at index')

var numeros = [5, 12, 8, 130, 44]

console.log(numeros)
// [5, 12, 8, 130, 44]
console.log(numeros.length)
// 5

var num = numeros.at(3)

console.log(num)
// 130

var num = numeros.at(-3)

console.log(num)
// 8

var num = numeros.at(100)

console.log(num)
// undefined