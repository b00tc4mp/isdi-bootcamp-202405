import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateAvatar('66b9d8e88e12a8eac3037936', 'https://hola'))
    .then(() => console.log('avatar updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())