import 'dotenv/config'
import mongoose from 'mongoose'
import createComment from './createComment.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createComment('66c4767ed83637b13b9926ed', '66c476e4bcc0a00ae5b0789d', 'yeahhhhhhh'))
    .then(comment => console.log(comment))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())