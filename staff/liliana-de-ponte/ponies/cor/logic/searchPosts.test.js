import 'dotenv/config'

import mongoose from 'mongoose'
import searchPosts from './searchPosts.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66b0c31c1a9e3c2ee7ef2efe', 'u'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
