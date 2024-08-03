import 'dotenv/config'
import createPost from './createPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66acc905a4613054b12160b5', 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493br8fx96yqf27386txcgsu380r0221pbgr9ivwmks6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Biancaaa'))
    .then(() => console.log('Post created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
