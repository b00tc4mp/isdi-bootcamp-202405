import 'dotenv/config.js'

import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('nerina', 'nerina123'))
    .then(() => console.log('user authenticated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


