import 'dotenv/config'
import mongoose from 'mongoose'
import sendMessage from './sendMessage.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => sendMessage('66cdb30729cd821604d7cead', '66cdb34342ccd159bcf8fee7', 'hola'))
    .then(() => console.log('message sent'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())