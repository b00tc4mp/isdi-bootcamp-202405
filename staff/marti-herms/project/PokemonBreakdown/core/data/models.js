import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const pokemonList = new Schema({
    count: {
        type: Number,
    },
    list: {
        type: [{
            id: {
                type: ObjectId,
                ref: 'Pokemon'
            },
            name: { type: String }
        }]
    }
})

const pokemon = new Schema({
    id: { type: Number },
    name: { type: String },
    moves: {
        type: [{
            id: {
                type: ObjectId,
                ref: 'Move'
            },
            name: { type: String }
        }]
    },
    // abilities: {
    //     type: [{
    //         id: {
    //             type: ObjectId,
    //             ref: 'Ability'
    //         },
    //         name: { type: String }
    //     }]
    // },
    // forms: { type: [String] },
    stats: {
        type: {
            hp: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
            atk: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
            def: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
            spa: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
            spd: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
            spe: {
                baseStat: { type: Number },
                evs: { type: Number },
                ivs: { type: Number }
            },
        }
    },
    types: {
        type: [{
            id: {
                type: ObjectId,
                rer: 'Type'
            },
            name: { type: String }
        }]
    }
})

const type = new Schema({
    name: { type: String },
    superEffective: {
        type: [{
            id: {
                type: ObjectId,
                rer: 'Type'
            },
            name: { type: String }
        }]
    },
    notVeryEffective: {
        type: [{
            id: {
                type: ObjectId,
                rer: 'Type'
            },
            name: { type: String }
        }]
    },
    noEffect: {
        type: [{
            id: {
                type: ObjectId,
                rer: 'Type'
            },
            name: { type: String }
        }]
    },
})

const move = new Schema({
    name: { type: String },
    accuracy: { type: Number },
    damageClass: { type: String },  // Physical, Special, Status
    effectChance: { type: Number },
    effect: { type: String },
    meta: {
        type: {
            ailment: { type: String },
            ailment_chance: { type: Number },
            category: { type: String },
            crit_rate: { type: Number },
            drain: { type: Number },
            flinch_chance: { type: Number },
            healing: { type: Number },
            max_hits: { type: Number },
            max_turns: { type: Number },
            min_hits: { type: Number },
            min_turns: { type: Number },
            stat_chance: { type: Number }
        }
    },
    power: { type: Number },
    powerPoints: { type: Number },
    priority: { type: Number },
    statChanges: {
        type: [{
            change: { type: Number },
            stat: { type: String }
        }]
    },
    target: { type: String },
    type: { type: String }
})

// const ability = new Schema({
//     name: { type: String },
//     effect: { type: String },
// })

const PokemonList = model('PokemonList', pokemonList)
const Pokemon = model('Pokemon', pokemon)
const Type = model('Type', type)
const Move = model('Move', move)
// const Ability = model('Ability', ability)

export {
    PokemonList,
    Pokemon,
    Type,
    Move,
    // Ability
}

