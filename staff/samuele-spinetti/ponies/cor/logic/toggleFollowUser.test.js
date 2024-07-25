import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import toggleFollowUser from './toggleFollowUser.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        toggleFollowUser('samu', 'marco', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Follow user toggled')

            client.close()
        })
    })
    .catch(error => console.error(error))

