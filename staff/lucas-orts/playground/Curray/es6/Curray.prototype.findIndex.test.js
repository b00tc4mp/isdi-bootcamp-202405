const Curray = require('./Curray')


console.info('TEST Curray.prototype.findIndex')

console.info('CASE findIndex in curray')

const numbers = new Curray(5, 12, 8, 130, 44)
{
    const found = numbers.findIndex((element) => element > 10)
    console.assert(found === 1, 'found is 1')
}
{
    const found = numbers.findIndex((element) => element > 100)
    console.assert(found === 3, 'found is 3')
}
{
    const found = numbers.findIndex((element) => element > 130)
    console.assert(found === -1, 'found is -1')
}