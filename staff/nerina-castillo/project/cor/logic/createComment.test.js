import 'dotenv/config'
import mongoose from 'mongoose'
import createComment from './createComment.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createComment('66c5b521116ac42a8bb4ac93', '66c5b55bb54858cc84489d7b', 'come on!'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())