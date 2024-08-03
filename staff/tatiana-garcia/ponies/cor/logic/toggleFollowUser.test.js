import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66acf00d9fd8201a1c692c85', '66acf0f09c0d3d4816596cc5'))
    .then(() => console.log('follow user toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())