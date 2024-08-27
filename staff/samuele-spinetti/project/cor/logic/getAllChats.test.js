import 'dotenv/config'
import getAllChats from './getAllChats.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllChats('66caf6bcb8024e545c9ee38d'))
    .then(chats => console.log(chats))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())