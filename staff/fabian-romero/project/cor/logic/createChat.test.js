import 'dotenv/config'
import createChat from './createChat.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createChat('66e7f45ba2cc03b4f590073e', '66e7f467ee1d91f30c52cc3a'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())