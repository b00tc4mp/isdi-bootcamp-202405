import 'dotenv/config'
import getChatParticipant from './getChatParticipant.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatParticipant('66cda1786dad81a083c9afd5', '66cdb34342ccd159bcf8fee7'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

