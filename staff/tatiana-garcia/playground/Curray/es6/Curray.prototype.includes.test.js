var Curray = require('./Curray')

console.info('TEST Curray.prototype.includes')

console.info('CASE array includes pokemonNames')
{
    const pokemonName = new Curray

    pokemonName[0] = 'eevee'
    pokemonName[1] = 'pikachu'
    pokemonName[2] = 'bulbasur'
    pokemonName.length = 3

    const pokemon1 = pokemonName.includes('eevee')
    const pokemon2 = pokemonName.includes(8)

    console.assert(pokemon1 === true, 'pokemon1 included eevee')
    console.assert(pokemon2 === false, 'pokemon1 does not included number 8')
}
console.info('TEST Curray.prototype.includes colors from index')

{
    const colors = new Curray

    colors[0] = 'red'
    colors[1] = 'green'
    colors[2] = 'blue'
    colors[3] = 'yellow'
    colors[4] = 'orange'
    colors[5] = 'pink'
    colors[6] = 'skyblue'
    colors[7] = 'red'
    colors[8] = 'white'
    colors[9] = 'black'
    colors[10] = 'grey'
    colors.length = 11

    const included1 = colors.includes('pink', 2)

    console.assert(included1 === true, 'included includes pink')

    const included = colors.includes('red', 8)

    console.assert(included === false, 'included does not include red')
}