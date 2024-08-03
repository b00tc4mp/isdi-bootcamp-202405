import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePassword('66acefee5ba0c1cf085df6e8', '123456789', '123123123'))
    .then(() => console.log('Password updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())