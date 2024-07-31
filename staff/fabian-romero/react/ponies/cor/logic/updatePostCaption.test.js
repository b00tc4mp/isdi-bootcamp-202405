import updatePostCaption from './updatePostCaption.js'
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

        updatePostCaption('Fabito', '66a120f9f77e1ffd65355dc5', 'New Caption para mi post', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('new caption')

            client.close()
        })

    })
    .catch(error => console.error(error))