import 'dotenv/config'
import deleteChatById from './deleteChatById.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteChatById('66eca0fde06749ab87b1522a', '66eca6b60701e7bcbe7a204c'))
    .then(() => console.log('Chat deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())