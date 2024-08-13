import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('rfederer', 'generateOnePost'))
    .then(() => console.log('post like toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
