import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66c4651375b0e791a02cf795', '66c46844f9fe869aec3b2840'))
    .then(() => console.log('like post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
