import fs from 'fs/promises'

fs.readFile('./db/jsonFiles/aaaPokemonList.json', 'utf-8')
    .then(json => {
        const file = JSON.parse(json)

        const promises = file.results.map(pokemon => fetch(pokemon.url))

        return Promise.all(promises)
    })
    .then(promises => {
        const pokemons = promises.map(response => response.json())

        return Promise.all(pokemons)
    })
    .then(pokemons => {
        const promises = pokemons.map(pokemon => {
            delete pokemon.abilities
            delete pokemon.base_experience
            delete pokemon.cries
            delete pokemon.forms
            delete pokemon.game_indices
            delete pokemon.height
            delete pokemon.held_items
            delete pokemon.is_default
            delete pokemon.location_area_encounters
            delete pokemon.order
            delete pokemon.past_abilities
            delete pokemon.past_types
            delete pokemon.species
            delete pokemon.sprites

            const json = JSON.stringify(pokemon)

            return fs.writeFile(`./db/jsonFiles/${pokemon.name}.json`, json)
        })

        return Promise.all(promises)
    })
    .catch(error => console.error(error))