import 'dotenv/config'
import mongoose from 'mongoose'

import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'


mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFollowingUserPosts('66ba420c6303f71808d2e287'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())




