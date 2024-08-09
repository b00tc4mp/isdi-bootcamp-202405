import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66afb08b82188b45d8eb0288', 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif?cid=82a1493bal4s8pqx9wahx4spwzaqj7fohoyfahtrmh0yvry4&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'soy un pony'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
