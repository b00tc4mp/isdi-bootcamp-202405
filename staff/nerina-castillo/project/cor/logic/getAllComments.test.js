import 'dotenv/config'
import mongoose from 'mongoose'
import getAllComments from './getAllComments.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllComments('66c597486b034849c9d13396'))
    .then(comments => console.log(comments))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())