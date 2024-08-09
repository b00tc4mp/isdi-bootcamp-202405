import 'dotenv/config'

import toggleFavPost from './toggleFavPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acd7e6f28f138bd0f0752d', '66ace09051e8d761f308aeaf'))
    .then(console.log('post favorited'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())