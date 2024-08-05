const Curray = require('./Curray')

console.info('TEST Array.prototype.find')

console.info('CASE find')

const numbers = new Curray(5, 12, 8, 130, 44)
{
    const found = numbers.find((element) => element > 10)
    console.assert(found === 12, 'found is equal to 12')
}

{
    const found = numbers.find((element) => element > 100)
    console.assert(found === 130, 'found is 130')
}

{
    const found = numbers.find((element) => element > 130)
    console.assert(found === undefined, 'found is undefined')
}