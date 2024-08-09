import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFavPosts('66acb2b1730b0f09da259589'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
