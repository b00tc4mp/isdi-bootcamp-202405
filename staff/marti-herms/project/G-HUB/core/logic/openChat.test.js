import 'dotenv/config'
import mongoose from 'mongoose'

import openChat from './openChat.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => openChat('66acb2b1730b0f09da259589', '66acb2b1730b0f09da259589'))
    .then(chatId => console.log(chatId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())