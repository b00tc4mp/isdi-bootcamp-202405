import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('Maritrueno', '123123123'))
    .then(userId => console.log('User authenticated', userId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())