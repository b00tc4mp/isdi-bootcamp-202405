import 'dotenv/config'
import getAllLikeEvents from './getAllLikeEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllLikeEvents("66be03f243d33462ad68cd4b"))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
