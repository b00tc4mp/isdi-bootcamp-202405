import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('lilideponte', '123456789'))
    .then(userId => console.log('user authendticated', userId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())