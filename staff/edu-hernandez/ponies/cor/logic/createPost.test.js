import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost(
        'eduhv',
        'https://example.com/image.gif',
        'Hola Mundo'
    ))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())