import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66ba420c6303f71808d2e287', '66ba420c6303f71808d2e287'))
    .then(() => console.log('user follow toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())