import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66cda1786dad81a083c9afd5', 'Necesito ayuda2'))
    .then(() => console.log('post created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())