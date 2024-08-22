import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => authenticateUser('carmen@valdivia.com', '123123123'))
    .then((user) => console.log('user authenticated', user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())