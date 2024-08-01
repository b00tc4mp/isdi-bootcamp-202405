import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('musa', '66ab5ff1f91a0b35f51a16eb'))
    .then(() => console.log('like post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

