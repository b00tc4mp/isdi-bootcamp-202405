import 'dotenv/config'
import registerUser from './registerUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('gonzalo', 'kickedintheteeth', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())