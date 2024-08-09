import 'dotenv/config'
import registerUser from './registerUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('max', 'maxpower', 'user', 'max@power.com', 'maxpower1', 'maxpower1'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())