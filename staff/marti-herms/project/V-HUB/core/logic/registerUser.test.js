import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('eden', 'marti@herms.com', '123123123', 'regular'))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
