import 'dotenv/config'
import mongoose from 'mongoose'
import createChat from './createChat.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createChat('66cda1786dad81a083c9afd5', '66cdb30729cd821604d7cead'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())