import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('lili', '66a2639ccaa8b9f476fb2d97'))
    .then(() => console.log('post favorite'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())