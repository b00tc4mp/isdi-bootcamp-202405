import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPosts('66c44c62702e78c4147da330'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())