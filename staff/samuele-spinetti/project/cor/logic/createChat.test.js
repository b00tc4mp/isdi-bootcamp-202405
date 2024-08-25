import 'dotenv/config'
import mongoose from 'mongoose'
import createChat from './createChat.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createChat('66c9aa05f625b4b1f73590ae', '66c9aa227a07bb18f10eff1c'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())