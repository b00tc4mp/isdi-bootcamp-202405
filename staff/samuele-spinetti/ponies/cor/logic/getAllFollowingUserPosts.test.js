import 'dotenv/config'

import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
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

        getAllFollowingUserPosts('samu', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            client.close()
        })
    })
    .catch(error => console.error(error))