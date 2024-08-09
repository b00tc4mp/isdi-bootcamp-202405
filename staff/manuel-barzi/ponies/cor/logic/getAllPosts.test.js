import 'dotenv/config'
import getAllPosts from './getAllPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPosts('66acb2db1f5dbdd3ba4e3efc'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
