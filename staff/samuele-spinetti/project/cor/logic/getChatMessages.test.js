import 'dotenv/config'
import mongoose from 'mongoose'
import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66cec9611aca55c62c9ef774', '66cec9991aca55c62c9ef778'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())