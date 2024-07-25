import addPost from './addPost.js'

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

        addPost('eden', 'https://sm.ign.com/t/ign_es/feature/t/the-15-bes/the-15-best-nicolas-cage-movies_ugq2.1280.jpg', 'hello world', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            client.close()
        })
    })
    .catch(error => console.error(error))