import 'dotenv/config'
import getAllLikeEvents from './getAllLikeEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllLikeEvents('66bf44704640ed8f4159c573'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
