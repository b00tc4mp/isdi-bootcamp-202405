import 'dotenv/config'
import getAllPosts from './getAllPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPosts('66acd7e6f28f138bd0f0752d'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
