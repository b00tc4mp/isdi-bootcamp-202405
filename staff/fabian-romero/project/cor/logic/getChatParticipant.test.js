import 'dotenv/config'
import mongoose from 'mongoose'

import getChatParticipant from './getChatParticipant.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatParticipant('66e7f45ba2cc03b4f590073e', '66e7f61eb292b9eb3fdc396b'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())