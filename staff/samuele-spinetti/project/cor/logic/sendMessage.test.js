import 'dotenv/config'
import mongoose from 'mongoose'
import sendMessage from './sendMessage.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => sendMessage('66c9aa05f625b4b1f73590ae', '66c9aa4c7c87375e718bdb37', 'hola'))
    .then(message => console.log(message))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())