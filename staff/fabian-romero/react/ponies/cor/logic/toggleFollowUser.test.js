import 'dotenv/config'

import toggleFollowUser from './toggleFollowUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66ace316a8d1e27c7c86ae83', '66acd7e6f28f138bd0f0752d'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())