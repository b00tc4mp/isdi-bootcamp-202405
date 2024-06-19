var Curray = require('./Curray')

console.log('TEST find')

console.log('CASE find from Curray')
{
    const numbers = new Curray(5, 12, 8, 130, 44)
    const found = numbers.find((element) => element > 10)
    console.assert(numbers.length === 5, 'numbers length is 5')
    console.assert(found === 12, 'the result of the variable "found" is 12')
}
console.log('CASE find from Curray')
{
    const numbers = new Curray(5, 12, 8, 130, 44)
    const found = numbers.find((element) => element < 10)
    console.assert(numbers.length === 5, 'numbers length is 5')
    console.assert(found === 5, 'the result of the variable "found" is 5')
}
console.log('CASE find from Curray')
{
    const numbers = new Curray(5, 12, 8, 130, 44)
    const found = numbers.find((element) => element > 130)
    console.assert(numbers.length === 5, 'numbers length is 5')
    console.assert(found === undefined, 'the result of the variable "found" is undefined')
}