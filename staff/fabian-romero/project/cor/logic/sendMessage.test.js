import 'dotenv/config'
import mongoose from 'mongoose'

import sendMessage from './sendMessage.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => sendMessage('66e7f45ba2cc03b4f590073e', '66e7f61eb292b9eb3fdc396b', 'Im interested about your project'))
    .then(() => console.log('message sent'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())