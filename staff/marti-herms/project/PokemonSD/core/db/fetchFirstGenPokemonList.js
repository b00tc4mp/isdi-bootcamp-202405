import fs from 'fs/promises'

const pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151'

fetch(pokeUrl)
    .then(response => response.json())
    .then(pokemonList => fs.writeFile('./db/PokemonList.json', JSON.stringify(pokemonList)))
    .catch(error => console.error(error))