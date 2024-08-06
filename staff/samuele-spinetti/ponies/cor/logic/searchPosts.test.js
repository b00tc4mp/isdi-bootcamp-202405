import 'dotenv/config'
import searchPosts from './searchPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66b09a8a17c327b82d270a22', '12'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())