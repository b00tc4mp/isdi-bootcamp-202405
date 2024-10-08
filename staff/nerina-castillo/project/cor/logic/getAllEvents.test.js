import 'dotenv/config'
import mongoose from 'mongoose'
import getAllEvents from './getAllEvents.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllEvents('66bb5c4680c11b0ae17525f9'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())