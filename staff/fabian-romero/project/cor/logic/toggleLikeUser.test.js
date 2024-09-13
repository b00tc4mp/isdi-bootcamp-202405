import 'dotenv/config'
import toggleLikeUser from './toggleLikeUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikeUser('66d1adada09fb6a58ec673ae', '66d1ada61c09da2bbca65426'))
    .then(() => console.log('User like toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())