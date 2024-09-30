import 'dotenv/config'
import createProduct from './createProduct.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createProduct('66fa9fe09fb3e58c26817a62', 'watermelon', '', 3, 4, 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif?cid=82a1493bal4s8pqx9wahx4spwzaqj7fohoyfahtrmh0yvry4&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [42.38249928035046, 2.152969735831627] }))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())