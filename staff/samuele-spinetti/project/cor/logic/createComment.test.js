import 'dotenv/config'
import createComment from './createComment.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createComment('66c488dffd5d85f0ccc8ecdc', '66c48926e2571d7e27f9cad2', 'Necesito ayuda comment'))
    .then(() => console.log('comment created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())