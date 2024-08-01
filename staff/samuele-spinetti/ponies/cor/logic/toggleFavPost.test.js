import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('samu', '66a111fcfe6fce00dcc348c8'))
    .then(() => console.log('Fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())