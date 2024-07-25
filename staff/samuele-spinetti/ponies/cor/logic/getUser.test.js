import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import getUser from './getUser.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        getUser('samu', 'samu', (error, user) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(user)

            client.close()
        })
    })
    .catch(error => console.error(error))

