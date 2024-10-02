import 'dotenv/config'
import createChat from './createChat.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createChat('66eca0f25188171ac79161bb', '66eca0fde06749ab87b1522a'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())