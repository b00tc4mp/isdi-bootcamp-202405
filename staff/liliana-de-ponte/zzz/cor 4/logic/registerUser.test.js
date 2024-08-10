import 'dotenv/config'
import registerUser from "./registerUser.js"
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        registerUser("Samuelle", "Spinetti", "samuele@spinetti.com", "samuelespinetti", "123456789", "123456789", error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('user registered')

            client.close()
        })
    })
    .catch(error => console.error(error))