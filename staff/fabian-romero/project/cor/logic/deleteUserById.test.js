import 'dotenv/config'
import deleteUserById from './deleteUserById.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteUserById('66eca0fde06749ab87b1522a'))
    .then(() => console.log('User deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())