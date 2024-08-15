import 'dotenv/config'
import getAllEvents from './getAllEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllEvents('66bc627e8b0f81232e0bda10'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
