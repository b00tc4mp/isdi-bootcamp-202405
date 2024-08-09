import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'


import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66ae141634b7a3d8e048afe0', '66af519f7883c41e81095f11'))
    .then(() => console.log('fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())