import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFavPosts('66acc905a4613054b12160b5'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())