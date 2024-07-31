import express from 'express'
import axios from 'axios'
import mongoose from 'mongoose'

import fs from 'fs'

mongoose.connect('127.0.0.1:27017')
    .then(() => {

    })
// const apiUrl = 'https://pokeapi.co/api/v2/pokemon'
const api = express()
const port = 8080

api.get('/api/data', async (req, res) => {
    try {
        // Replace the URL with the endpoint of the public API you want to fetch data from
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

        // Make a GET request to the public API
        const response = await axios.get(apiUrl)

        const json = JSON.stringify(response.data)

        fs.writeFileSync('./pokemonList.json', json)

        // Send the API response data back to the client
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching data from API:', error)
        res.status(500).json({ error: 'An error occurred while fetching data.' })
    }
})

api.get('/api/pokemon', async (req, res) => {
    const jsonRead = fs.readFileSync('./pokemonList.json', 'utf-8')

    const { results } = JSON.parse(jsonRead)

    const names = results.map(pokemon => pokemon.name)

    const names1 = names.slice(0, 151)

    names1.forEach(async pokemonName => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

        const response = await axios.get(apiUrl)

        const pokemon = response.data

        delete pokemon.base_experience
        delete pokemon.cries
        delete pokemon.game_indices
        delete pokemon.height
        delete pokemon.held_items
        delete pokemon.is_default
        delete pokemon.location_area_encounters
        delete pokemon.order
        delete pokemon.past_abilities
        delete pokemon.past_type
        delete pokemon.species

        const jsonWrite = JSON.stringify(response.data)

        fs.appendFile('./pokemon.json', jsonWrite, (error) => {
            if (error) throw new Error;

            console.log('It\'s saved!');
        })
    })


    res.send()
})


api.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})