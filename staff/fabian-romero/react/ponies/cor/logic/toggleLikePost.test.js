import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66acd7e6f28f138bd0f0752d', '66ace09051e8d761f308aeaf'))
    .then(() => console.log('like post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())