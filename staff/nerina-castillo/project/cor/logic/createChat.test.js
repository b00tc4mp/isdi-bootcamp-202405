import 'dotenv/config'
import mongoose from 'mongoose'
import createChat from './createChat.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createChat('66c762ef4f6050ba3a72dc90', '66c84b7e0fd60e029920a185'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())