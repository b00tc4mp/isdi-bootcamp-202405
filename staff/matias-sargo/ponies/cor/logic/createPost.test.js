import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        createPost('samu', 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif?cid=82a1493bal4s8pqx9wahx4spwzaqj7fohoyfahtrmh0yvry4&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Hello manu', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))