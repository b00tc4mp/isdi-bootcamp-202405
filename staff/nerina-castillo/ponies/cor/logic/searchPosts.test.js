import 'dotenv/config'
import searchPosts from './searchPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66b0c81c631c3e104a4237bc', 'hey'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())