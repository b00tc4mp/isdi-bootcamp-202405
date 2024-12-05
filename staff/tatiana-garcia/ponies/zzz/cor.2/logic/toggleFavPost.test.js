import toggleFavPost from './toggleFavPost.js'
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

        toggleFavPost('fabito', '66a10286553b62906879ac62', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post favorite')

            client.close()
        })
    })
    .catch(error => console.error(error))