import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66accdd2e9ee54b250431485', '66acce028f9a08e3fb4e26a7'))
    .then(() => console.log('post like toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

