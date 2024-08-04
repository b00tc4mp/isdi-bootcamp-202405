import { Schema, model, ObjectId } from 'mongoose'

// const pokemonList = new Schema({
//     count: {
//         type: Number,
//     },
//     results: {
//         type: [String]
//     }
// })

const pokemon = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

// const ability = new Schema({
//     name: {
//         type: String
//     },
//     isHidden: {
//         type: Boolean
//     }
// })

// const PokemonList = model('PokemonList', pokemonList)
const Pokemon = model('Pokemon', pokemon)
// const Ability = model('Ability', ability)

export {
    // PokemonList,
    // Ability,
    Pokemon
}

