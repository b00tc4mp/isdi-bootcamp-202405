import 'dotenv/config'
import mongoose from 'mongoose'
import searchEvent from './searchEvent.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvent('66d16f326c974443120290eb', 'concert', 1, [40.7128, -74.006], '2024-08-30T09:54:40'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())