import 'dotenv/config'
import getUser from './getUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUser('66ba007f874aa7b84ec54491', '66ba007f874aa7b84ec54491'))
    .then(() => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())