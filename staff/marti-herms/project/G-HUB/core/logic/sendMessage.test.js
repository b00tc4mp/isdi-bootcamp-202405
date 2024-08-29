import 'dotenv/config'
import mongoose from 'mongoose'
import sendMessage from './sendMessage.js'
import { Message } from '../data/models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => sendMessage('66c7632d2427a0b2deea74ff', '66c780ed9ca90db154f5a1db', 'hello!'))
    .then(() => Message.findOne({ content: 'hello!' }))
    .then(message => console.log(message))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())