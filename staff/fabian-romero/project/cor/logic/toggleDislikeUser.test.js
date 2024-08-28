import 'dotenv/config'
import toggleDislikeUser from './toggleDislikeUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleDislikeUser('66cdc67564c62e5a0ebbeff9', '66cdc67e46ef536d3d98ec8d'))
    .then(() => console.log('dont like this user'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())