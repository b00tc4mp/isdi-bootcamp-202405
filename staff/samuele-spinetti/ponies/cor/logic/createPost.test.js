import 'dotenv/config'

import createPost from './createPost.js'
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

        createPost('marco', 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493br8fx96yqf27386txcgsu380r0221pbgr9ivwmks6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Biancaaa', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post created')

            client.close()
        })
    })
    .catch(error => console.error(error))