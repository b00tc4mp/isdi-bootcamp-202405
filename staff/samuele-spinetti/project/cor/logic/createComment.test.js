import 'dotenv/config'
import createComment from './createComment.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createComment('66cda1786dad81a083c9afd5', '66cdca4fd56d4c7e2498f038', 'Necesito ayuda comment'))
    .then(() => console.log('comment created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())