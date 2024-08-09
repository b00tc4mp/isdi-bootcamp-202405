import 'dotenv/config'

import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('maxpower', 'maxpower1'))
    .then(userId => console.log('user autenticated', userId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())