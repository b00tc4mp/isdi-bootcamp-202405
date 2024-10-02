import 'dotenv/config'
import getAllMatchs from './getAllMatchs.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllMatchs('66e7f467ee1d91f30c52cc3a'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())