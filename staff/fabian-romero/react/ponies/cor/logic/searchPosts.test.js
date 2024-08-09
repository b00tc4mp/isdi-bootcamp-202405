import 'dotenv/config'
import searchPosts from './searchPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66accdd2e9ee54b250431485', 'atomic'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())