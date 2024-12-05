import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66ae141634b7a3d8e048afe0', '66af519f7883c41e81095f11'))
    .then(() => console.log('post like toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())