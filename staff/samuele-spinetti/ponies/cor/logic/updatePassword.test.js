import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePassword('marco', '123123123', '123456789'))
    .then(() => console.log('Password updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())