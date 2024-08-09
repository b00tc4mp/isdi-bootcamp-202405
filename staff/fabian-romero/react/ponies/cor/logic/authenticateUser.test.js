import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('vacaloca', '123123123'))
    .then(() => console.log('user authenticated'))
    .finally(() => mongoose.disconnect())
