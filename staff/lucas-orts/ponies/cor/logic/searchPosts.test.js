import 'dotenv/config'
import searchPosts from './searchPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66afb08b82188b45d8eb0288', 'hon'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())