import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('lilideponte', '66a2159ae4df01c62b263e34'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
