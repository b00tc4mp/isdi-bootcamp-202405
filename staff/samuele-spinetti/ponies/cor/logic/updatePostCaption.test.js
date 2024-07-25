import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import updatePostCaption from './updatePostCaption.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')
        const posts = test.collection('posts')

        data.users = users
        data.posts = posts

        updatePostCaption('samu', '66a111a10a87a2ab73835b9c', 'Hello, Marco!', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post caption updated')

            client.close()
        })
    })
    .catch(error => console.error(error))
