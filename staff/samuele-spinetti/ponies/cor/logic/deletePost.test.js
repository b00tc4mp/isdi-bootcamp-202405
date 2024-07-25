import 'dotenv/config'

import deletePost from './deletePost.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')
        const posts = test.collection('posts')

        data.users = users
        data.posts = posts

        deletePost('samu', '66a111da21d28f7435d5c1d6', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post deleted')

            client.close()
        })
    })
    .catch(error => console.error(error))