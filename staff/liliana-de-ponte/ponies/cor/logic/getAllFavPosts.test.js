import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFavPosts("66acd8fe0657af2f48044c0a"))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
