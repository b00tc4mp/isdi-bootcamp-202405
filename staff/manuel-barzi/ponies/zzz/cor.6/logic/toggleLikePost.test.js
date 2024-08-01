import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('musa', '66a22c2d256603d7c5014e9c'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

