import 'dotenv/config'
import searchPosts from './searchPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPosts('66b11c5297b1086bffd50181', 'ardilla'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())