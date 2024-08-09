import fs from 'fs/promises'

const pokeUrl = 'https://pokeapi.co/api/v2/move?limit=1000&offset=0'

fetch(pokeUrl)
    .then(response => response.json())
    .then(pokemonList => fs.writeFile('./db/MoveList.json', JSON.stringify(pokemonList)))
    .catch(error => console.error(error))