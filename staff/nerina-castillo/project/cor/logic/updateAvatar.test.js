import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateAvatar('66e862a76b0c29f62c502ac7', 'https://hola'))
    .then(() => console.log('avatar updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())