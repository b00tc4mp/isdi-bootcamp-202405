import 'dotenv/config'
import getAllEvents from './getAllEvents.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllEvents('66fa92c16018e425775d4c35'))
    .then((events) => console.log('Event successfully deleted', events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())