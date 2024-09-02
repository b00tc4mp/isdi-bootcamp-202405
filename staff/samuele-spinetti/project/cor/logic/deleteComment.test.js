import 'dotenv/config'
import deleteComment from './deleteComment.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteComment('66c595919273c57d646f91a0', '66c596b79273c57d646f91c9'))
    .then(() => console.log('comment deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())