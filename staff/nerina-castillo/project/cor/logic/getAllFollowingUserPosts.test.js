import 'dotenv/config'
import mongoose from 'mongoose'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFollowingUserPosts('66d16f326c974443120290eb'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())




