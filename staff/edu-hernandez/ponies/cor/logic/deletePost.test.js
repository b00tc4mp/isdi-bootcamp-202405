import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('rfederer', 'generatePost'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())