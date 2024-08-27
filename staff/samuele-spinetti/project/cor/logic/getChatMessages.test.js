import 'dotenv/config'
import mongoose from 'mongoose'
import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66cca01b23105917f0644ae2', '66cca06e23105917f0644ae6'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())