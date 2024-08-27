import 'dotenv/config'
import getChatParticipant from './getChatParticipant.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatParticipant('66cc595d6e82711ffbb75e83', '66cc59ca6e82711ffbb75ea8'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

