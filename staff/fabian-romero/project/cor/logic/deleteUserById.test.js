import 'dotenv/config'
import deleteUserById from './deleteUserById.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteUserById('66c73c2d13876c0219f8d796'))
    .then(() => console.log('User deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())