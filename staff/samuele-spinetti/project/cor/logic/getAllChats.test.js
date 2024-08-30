import 'dotenv/config'
import getAllChats from './getAllChats.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllChats('66cec9611aca55c62c9ef774'))
    .then(chats => console.log(chats))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())