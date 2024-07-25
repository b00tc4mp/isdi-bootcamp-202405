import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import toggleLikePost from './toggleLikePost.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')
        const posts = test.collection('posts')

        data.users = users
        data.posts = posts

        toggleLikePost('samu', '66a111fcfe6fce00dcc348c8', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Like post toggled')

            client.close()
        })
    })
    .catch(error => console.error(error))
