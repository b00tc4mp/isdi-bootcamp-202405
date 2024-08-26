import 'dotenv/config'
import mongoose from 'mongoose'

import toggleFollowUser from './toggleFollowUser.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66ba007f874aa7b84ec54491', '66ba313a881fabd96394b179'))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())