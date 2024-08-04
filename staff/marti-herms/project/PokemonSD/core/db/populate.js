import mongoose from 'mongoose'

import { Pokemon } from '../data/models.js'

import fs from 'fs/promises'
import path from 'path'

// mongoose.connect('mongodb://127.0.0.1:27017/pokemon')
//     .then(() => {
//         return fs.readFile('./db/abomasnow.json', 'utf-8')
//             .then(json => JSON.parse(json))
//             .then(abomasnow => {
//                 const id = abomasnow.id

//                 delete abomasnow.id

//                 return Pokemon.create({
//                     id,
//                     name: abomasnow,
//                     data: abomasnow
//                 })
//             })
//     })
//     .catch(error => console.error(error))
//     .finally(() => mongoose.disconnect())

mongoose.connect('mongodb://127.0.0.1:27017/pokemon')
    .then(() => {
        return fs.readdir('./db')
            .then(files => files.filter(file => file !== 'populate.js' || file !== 'pokemonList.js'))
            .then(jsonFiles => {
                const promiseArray = []
                for (const value of jsonFiles) {
                    const promise = fs.readFile(`./db/${value}`, 'utf-8')
                        .then(json => {

                            const pokemon = JSON.parse(json)

                            const id = pokemon.id

                            console.log(value)
                            console.log(id)

                            const name = value.slice(0, -5)

                            delete pokemon.id

                            return Pokemon.create({
                                id: id,
                                name: name,
                                data: pokemon
                            })
                        })
                    promiseArray.push(promise)
                }
                return Promise.all(promiseArray)
            })
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())