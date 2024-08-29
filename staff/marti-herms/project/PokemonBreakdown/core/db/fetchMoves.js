import fs from 'fs/promises'

fs.readFile('./db/MoveList.json', 'utf-8')
    .then(json => {
        const file = JSON.parse(json)

        const promises = file.results.map(move => fetch(move.url))

        return Promise.all(promises)
    })
    .then(promises => {
        const moves = promises.map(response => response.json())

        return Promise.all(moves)
    })
    .then(moves => {
        const promises = moves.map(move => {
            delete move.contest_combos
            delete move.contest_effect
            delete move.contest_type
            delete move.effect_changes
            delete move.flavor_text_entries
            delete move.learned_by_pokemon
            delete move.machines
            delete move.names
            delete move.past_values
            delete move.super_contest_effect

            const json = JSON.stringify(move)

            return fs.writeFile(`./db/jsonFilesMoves/${move.name}.json`, json)
        })

        return Promise.all(promises)
    })
    .catch(error => console.error(error))