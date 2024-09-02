import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePassword('66b9e3c2a7f4e080a6d38e77', '123123123', '123456789', '123456789'))
    .then(() => console.log('password updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())