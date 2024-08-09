import 'dotenv/config'
import getUserName from './getUserName.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66acd7e6f28f138bd0f0752d', '66ace316a8d1e27c7c86ae83'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())