import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66c46ab8be846e75139d37b7', 'Necesito ayuda2'))
    .then(() => console.log('post created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())