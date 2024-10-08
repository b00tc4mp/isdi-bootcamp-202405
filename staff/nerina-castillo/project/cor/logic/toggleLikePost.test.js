import 'dotenv/config'
import mongoose from 'mongoose'
import toggleLikePost from './toggleLikePost.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66c44baf60598c55ad2e8caf', '66c44be4fa30553654106898'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())