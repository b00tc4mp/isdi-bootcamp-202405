import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66acd71db43870a515ffb02f', '66acd787cb749efdab22f8f2'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
