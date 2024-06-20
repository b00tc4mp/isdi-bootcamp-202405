const Curray = require('./Curray')


console.info('TEST Curray.prototype.includes')

console.info('CASE includes in Curray')
{
    const numeros = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    const numeros1 = numeros.includes(6)

    const numeros2 = numeros.includes(50)

    console.assert(numeros1 === true, 'numeros1 includes 6')
    console.assert(numeros2 === false, 'numeros2 do not includes 50')
}
console.log('TEST Curray includes color from index')
{
    const colors = new Curray('red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey')

    const included = colors.includes('pink', 2)
    console.assert(included === true, 'included includes pink')
}
{


    const included = colors.includes('red', 4)

    console.assert(included === true, 'included includes red')
}
{
    const included = colors.includes('red', 8)

    console.assert(included === false, 'included does not include red')
}