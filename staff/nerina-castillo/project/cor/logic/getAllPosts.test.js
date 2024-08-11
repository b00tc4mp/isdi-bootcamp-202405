import 'dotenv/config'

import getAllPosts from './getAllPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPosts('66b8973c63d9cd8871e233db'))
    .then(posts => console.log(posts))
    .catch(error => conle.error(error))
    .finally(() => mongoose.disconnect())