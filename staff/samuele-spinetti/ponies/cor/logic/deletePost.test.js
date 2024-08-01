import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('samu', '66a111da21d28f7435d5c1d6'))
    .then(() => console.log('Post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.connection())