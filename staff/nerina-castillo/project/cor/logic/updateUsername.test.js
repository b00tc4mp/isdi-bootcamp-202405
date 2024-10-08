import 'dotenv/config'
import updateUsername from './updateUsername.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateUsername('66febfd35f10d766e8074333', 'julitoCamelas'))
    .then(() => console.log('username updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())