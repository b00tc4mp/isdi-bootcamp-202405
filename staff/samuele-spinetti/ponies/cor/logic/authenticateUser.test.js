import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('samu', '123123123'))
    .then(() => console.log('User authenticated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())