import 'dotenv/config'
import getAllUserEvents from './getAllUserEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllUserEvents('66acb2b1730b0f09da259589'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
