import 'dotenv/config'
import toggleLikeUser from './toggleLikeUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikeUser('66cdc67564c62e5a0ebbeff9', '66cdc67e46ef536d3d98ec8d'))
    .then(() => console.log('User like toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())