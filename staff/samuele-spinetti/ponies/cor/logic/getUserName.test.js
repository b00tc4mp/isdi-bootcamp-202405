import 'dotenv/config'

import getUserName from './getUserName.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        getUserName('samu', 'samu', (error, name) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(name)

            client.close()
        })
    })
    .catch(error => console.error(error))

