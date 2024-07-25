import createPost from './createPost.js'
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

        createPost('lili', 'https://imagenes.muyinteresante.com/files/image_414_276/uploads/2023/06/07/6480712e4d70d.jpeg', 'koalas', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            client.close()
        })

    })
    .catch(error => console.error(error))
