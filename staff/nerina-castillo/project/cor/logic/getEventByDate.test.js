import 'dotenv/config'
import mongoose from 'mongoose'
import getEventByDate from './getEventByDate.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getEventByDate('66cd99adf1a137eaa2b8fc38', '2024-08-27T09:24:59.003Z'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())