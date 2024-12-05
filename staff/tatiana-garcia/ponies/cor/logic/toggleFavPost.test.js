import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acf0f09c0d3d4816596cc5', '66acf11f737f18ee661a2ea9'))
    .then(() => console.log('post favorite'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())