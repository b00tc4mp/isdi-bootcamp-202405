import 'dotenv/config'
import mongoose from 'mongoose'
import deleteComment from './deleteComment.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteComment('66c5b521116ac42a8bb4ac93', '66c5b604c4b6708be3b8d912'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())