import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'


import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66ae141634b7a3d8e048afe0', '66ae141634b7a3d8e048afe0'))
    .then(() => console.log('follow user toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())