import 'dotenv/config'
import createPost from './createPost.js'
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

        createPost('samu', 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif?cid=82a1493bal4s8pqx9wahx4spwzaqj7fohoyfahtrmh0yvry4&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Hello manu', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            client.close()
        })
    })
    .catch(error => console.error(error))