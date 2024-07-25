import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
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

        updatePostCaption('samu', '66a0d4c58dd27a1ef3ff53c8', 'Hello, soy Samu', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption updated')

            client.close()
        })
    })
    .catch(error => console.error(error))