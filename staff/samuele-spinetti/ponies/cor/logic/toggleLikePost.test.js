import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('samu', '66a111fcfe6fce00dcc348c8'))
    .then(() => console.log('Like post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
