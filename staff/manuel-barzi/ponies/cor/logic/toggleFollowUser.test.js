import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66acb2b1730b0f09da259589', '66acb2db1f5dbdd3ba4e3efc'))
    .then(() => console.log('user follow toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

