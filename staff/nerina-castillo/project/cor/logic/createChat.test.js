import 'dotenv/config'
import mongoose from 'mongoose'
import createChat from './createChat.js'
import { User } from '../data/models.js'

const userId1 = '66c6f8475a6c265186616a01'
const userId2 = '66c6f896bb641a8039e83722'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        return User.find({ _id: { $in: [userId1, userId2] } })
    })
    .then(users => {
        if (users.length !== 2) {
            throw new Error('Uno o más usuarios no fueron encontrados.')
        }

        return createChat([userId1, userId2]);
    })
    .then(chat => {
        console.log(chat)
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())