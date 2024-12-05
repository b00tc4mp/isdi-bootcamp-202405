import deletePost from './deletePost.js'
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

        deletePost('lili', '66a0f87eb6de170df97962fb', error => {
            if (error) {
                console.error(error)

                return
            }
            console.log('post deleted')

            client.close()
        })
    })
    .catch(error => console.error(error))





