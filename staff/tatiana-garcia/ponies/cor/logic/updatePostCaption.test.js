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

        updatePostCaption('fabito', '66a1ed4d15e1b19d77264647', 'pajarito', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption update')

            client.close()
        })

    })
    .catch(error => console.error(error))
