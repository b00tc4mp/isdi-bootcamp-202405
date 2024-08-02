import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acd71db43870a515ffb02f', '66acdc44eaeadf6d753d75e5'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
