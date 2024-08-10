import 'dotenv/config'
import toggleFollowUser from "./toggleFollowUser.js"

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser("66acd8fe0657af2f48044c0a", "66acd71db43870a515ffb02f"))
    .then(() => console.log('follow user toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
