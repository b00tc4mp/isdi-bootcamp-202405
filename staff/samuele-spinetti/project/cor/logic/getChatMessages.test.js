import 'dotenv/config'
import mongoose from 'mongoose'
import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66c9c492ce0de079418b7da5', '66c9cbdfaf95868b7be7df1e'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())