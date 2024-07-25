import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import registerUser from './registerUser.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        registerUser('Marco', 'Carbone', 'marco@carbone.com', 'marco', '123123123', '123123123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('User registered')

            client.close()
        })
    })
    .catch(error => console.error(error))