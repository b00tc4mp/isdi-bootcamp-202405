import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66d16f326c974443120290eb', '66d16ec57b2bc87a134077bb'))
    .then(() => console.log('user follow toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())