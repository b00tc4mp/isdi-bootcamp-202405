import 'dotenv/config'
import getAllMatchs from './getAllMatchs.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllMatchs('66d1ada61c09da2bbca65426'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())