const Curray = require('./Curray')

console.info('TEST Curray.prototype.fill')

console.info('CASE fill with 1 parameter in Curray')

{
    const numbers = new Curray(1, 2, 3, 4)
    const numbers1 = numbers.fill(6)

    console.assert(numbers.length === numbers1.length, 'numbers length is 4')
    console.assert(numbers[0] === 6, 'numbers at 0 is 6')
    console.assert(numbers[1] === 6, 'numbers at 1 is 6')
    console.assert(numbers[2] === 6, 'numbers at 2 is 6')
    console.assert(numbers[3] === 6, 'numbers at 3 is 6')
}

console.info('CASE fill with 2 parameter in Curray')

{
    const numbers = new Curray(1, 2, 3, 4)
    const numbers1 = numbers.fill(5, 1)

    console.assert(numbers.length === numbers1.length, 'numbers length is 4')
    console.assert(numbers[0] === 1, 'numbers at 0 is 1')
    console.assert(numbers[1] === 5, 'numbers at 1 is 5')
    console.assert(numbers[2] === 5, 'numbers at 2 is 5')
    console.assert(numbers[3] === 5, 'numbers at 3 is 5')
}

console.info('CASE fill with 3 parameter in Curray')
{
    const numbers = new Curray(1, 2, 3, 4)
    const numbers1 = numbers.fill(0, 2, 3)

    console.assert(numbers.length === numbers1.length, 'numbers length is 4')
    console.assert(numbers[0] === 1, 'numbers at 0 is 1')
    console.assert(numbers[1] === 2, 'numbers at 1 is 2')
    console.assert(numbers[2] === 0, 'numbers at 2 is 0')
    console.assert(numbers[3] === 4, 'numbers at 3 is 4')
}