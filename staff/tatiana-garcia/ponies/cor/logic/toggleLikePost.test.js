import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('samuelespinetti', '66a2639ccaa8b9f476fb2d97'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())