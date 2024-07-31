import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
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

        toggleLikePost('samuelespinetti', '66a0cd0632ecf3c75b98dbf9', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('like post toggled')

            client.close()
        })
    })
    .catch(error => console.error(error))
