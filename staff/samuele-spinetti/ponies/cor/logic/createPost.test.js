import 'dotenv/config'
import createPost from './createPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        createPost('marco', 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493br8fx96yqf27386txcgsu380r0221pbgr9ivwmks6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Biancaaa', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post created')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))