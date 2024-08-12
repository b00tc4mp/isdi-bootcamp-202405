import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acc905a4613054b12160b5', '66acca9105d8720b486dbef4'))
    .then(() => console.log('Fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())