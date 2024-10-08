import 'dotenv/config'
import mongoose from 'mongoose'
import getAllPosts from './getAllPosts.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPosts('66b8973c63d9cd8871e233db'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())