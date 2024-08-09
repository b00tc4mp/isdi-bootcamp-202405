import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        authenticateUser('samuelespinetti', '123123123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('user authenticated')

            client.close()
        })
    })
    .catch(error => console.error(error))
