import fs from 'fs/promises'

fs.readdir('./db/jsonFiles')
    .then(files => {
        // files = files.filter(file => file !== 'aaaPokemonList.json')

        // console.log(files)
        const promises = files.map(file => {
            return fs.readFile(`./db/jsonFilesPokemon/${file}`, 'utf-8')
                .then(json => {
                    return JSON.parse(json)
                })
                .then(pokemon => {
                    for (let i = 0; i < pokemon.moves.length; i++) {
                        pokemon.moves[i] = pokemon.moves[i].move.name
                    }

                    // pokemon.stats = {
                    //     hp: {
                    //         baseStat: pokemon.stats[0].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     },
                    //     atk: {
                    //         baseStat: pokemon.stats[1].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     },
                    //     def: {
                    //         baseStat: pokemon.stats[2].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     },
                    //     spa: {
                    //         baseStat: pokemon.stats[3].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     },
                    //     spd: {
                    //         baseStat: pokemon.stats[4].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     },
                    //     spe: {
                    //         baseStat: pokemon.stats[5].base_stat,
                    //         evs: 0,
                    //         ivs: 31
                    //     }
                    // }

                    // for (let i = 0; i < pokemon.types.length; i++) {
                    //     pokemon.types[i] = pokemon.types[i].type.name
                    // }

                    // console.log(pokemon.name, pokemon.types)

                    const json = JSON.stringify(pokemon)

                    return fs.writeFile(`./db/jsonFiles/${file}`, json)
                })
        })

        return Promise.all(promises)
    })
    .catch(error => console.error(error))