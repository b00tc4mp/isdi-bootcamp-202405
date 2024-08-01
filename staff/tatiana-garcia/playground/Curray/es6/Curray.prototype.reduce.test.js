const Curray = require('./Curray')

console.info('TEST reduce')
console.info('CASE reduce elements to Curray')


const numbers = new Curray(1, 2, 3, 4)

const initialValue = 0

const sumWithInitial = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
)

console.assert(sumWithInitial === 10, 'sumWithInitial is equal to 10')

//console.log(sumWithInitial);
// Expected output: 10