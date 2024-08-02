import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('musa', 'samu'))
    .then(() => console.log('user follow toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

