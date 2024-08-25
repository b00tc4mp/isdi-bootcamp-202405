import 'dotenv/config'
import getPostComments from './getPostComments.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPostComments('66c86e6eafe9c8661da668a7', '66c881006dd18058bf2e8d41'))
    .then(comments => console.log(comments))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())