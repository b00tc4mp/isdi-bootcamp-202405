import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser("samuspine", "123456789"))
    .then(() => console.log('user authenticated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
