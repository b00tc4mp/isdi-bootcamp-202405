import 'dotenv/config'
import mongoose from 'mongoose'
import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66cda1786dad81a083c9afd5', '66cdb30729cd821604d7cead'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())