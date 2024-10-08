import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePassword('66fed0d94efd42fecf435545', 'julitocalemas123', 'julitocalemas1', 'julitocalemas1'))
    .then(() => console.log('password updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())