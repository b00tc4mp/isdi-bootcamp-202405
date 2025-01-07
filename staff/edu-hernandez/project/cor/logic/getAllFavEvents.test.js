import 'dotenv/config'
import getAllFavPosts from './getAllFavEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFavPosts('66acb2b1730b0f09da259589'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
