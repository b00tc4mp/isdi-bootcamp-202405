import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66acc905a4613054b12160b5', '66acc905a4613054b12160b5'))
    .then(() => console.log('Follow user toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())