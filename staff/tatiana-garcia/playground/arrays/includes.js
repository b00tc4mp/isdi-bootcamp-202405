console.log('TEST includes')

console.log('CASE array includes pokemonNames')

var pokemonName = ['eevee', 'pikachu', 'bulbasur']

console.log(pokemonName.includes('eevee'))
//true
console.log(pokemonName.includes(8))
//false

console.log('TEST arrays includes colors from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'white', 'red', 'black', 'grey']

var included = colors.includes('red', 4)
console.log(included)
//true

var included = colors.includes('red', 8)
console.log(included)
//false