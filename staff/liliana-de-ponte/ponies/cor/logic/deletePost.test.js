import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('samuelespinetti', '66a12a0562aa6b753ba394f8'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
