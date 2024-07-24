import getAllFavPosts from './getAllFavPosts.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')
        const posts = test.collection('posts')

        data.users = users
        data.posts = posts

        getAllFavPosts('marti', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            client.close()
        })
    })
    .catch(error => console.error(error))
