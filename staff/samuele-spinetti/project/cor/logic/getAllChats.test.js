import 'dotenv/config'
import getAllChats from './getAllChats.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllChats('66cda1786dad81a083c9afd5'))
    .then(chats => console.log(chats))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())