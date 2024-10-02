import 'dotenv/config'
import getLikeUsers from './getLikeUsers.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getLikeUsers('66cdc67e46ef536d3d98ec8d'))
    .then((users) => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())