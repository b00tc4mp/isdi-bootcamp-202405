import 'dotenv/config'
import getAllGoingEvents from './getAllGoingEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllGoingEvents('66fb48176937d4f356dab927'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())