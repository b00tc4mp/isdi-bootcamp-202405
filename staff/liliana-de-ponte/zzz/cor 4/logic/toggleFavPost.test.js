import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
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

        toggleFavPost('lilideponte', '66a12a0562aa6b753ba394f8', error => {
            if (error) {
                cancelIdleCallback(new Error(error.message))

                return
            }

            console.log('fav post toggled')

            client.close()

        })
    })
    .catch(error => console.error(error))
