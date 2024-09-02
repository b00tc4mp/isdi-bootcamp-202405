import 'dotenv/config'
import getPostComments from './getPostComments.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPostComments('66cda1786dad81a083c9afd5', '66cdca4fd56d4c7e2498f038'))
    .then(comments => console.log(comments))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())