import 'dotenv/config'
import getEvent from './getEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getEvent('66c2f96e5ab09b17a9ef3c5e', '66c3011a9ac63fe60db24126'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
