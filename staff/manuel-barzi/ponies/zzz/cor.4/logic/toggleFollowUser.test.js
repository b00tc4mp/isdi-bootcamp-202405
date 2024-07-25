import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')
        const posts = test.collection('posts')

        data.users = users
        data.posts = posts

        toggleFollowUser('samu', 'marti', error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            console.log('follow user toggled')

            client.close()
        })
    })
    .catch(error => console.error(error))