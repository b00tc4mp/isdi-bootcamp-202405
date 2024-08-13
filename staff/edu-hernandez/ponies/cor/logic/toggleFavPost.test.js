import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('eduhv', 'generatePostId'))
    .then(() => console.log('like post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())