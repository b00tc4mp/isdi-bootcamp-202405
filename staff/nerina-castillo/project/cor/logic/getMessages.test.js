import 'dotenv/config'
import mongoose from 'mongoose'
import getMessages from './getMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getMessages('66c74ef148708703fcb202d9', '66c74f77cd44c4998f03f0a5'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())