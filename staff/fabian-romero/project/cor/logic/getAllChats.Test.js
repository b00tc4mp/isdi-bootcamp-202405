import 'dotenv/config'
import getAllChats from './getAllChats.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllChats('66e7f45ba2cc03b4f590073e'))
    .then(chats => console.log(chats))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())