import 'dotenv/config'
import mongoose from 'mongoose'

import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66e7f467ee1d91f30c52cc3a', '66e7f467ee1d91f30c52cc3a'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())