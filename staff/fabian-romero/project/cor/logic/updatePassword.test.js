import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePassword('66c083f85b5756e9c122f124', '123456789', '123123123', '123123123'))
    .then(() => console.log('new password correct'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
