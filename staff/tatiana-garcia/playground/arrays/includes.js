console.info('TEST includes')

console.info('CASE array includes pokemonNames')

var pokemonName = ['eevee', 'pikachu', 'bulbasur']

var pokemon1 = pokemonName.includes('eevee')
var pokemon2 = pokemonName.includes(8)

console.assert(pokemon1 === true, 'pokemon1 included eevee')
console.assert(pokemon2 === false, 'pokemon1 does not included number 8')

console.info('CASE includes colors from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'white', 'red', 'black', 'grey']

var included = colors.includes('red', 4)

console.assert(included === true, 'included includes red')

var included = colors.includes('red', 10)

console.assert(included === false, 'included does not include red')