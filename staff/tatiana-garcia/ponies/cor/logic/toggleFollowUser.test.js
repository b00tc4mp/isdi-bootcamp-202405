import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('abtg', 'tatig'))
    .then(() => console.log('follow user toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())