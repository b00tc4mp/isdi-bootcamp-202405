import 'dotenv/config'
import searchEvent from './searchEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvent('66accdd2e9ee54b250431485', 'atomic'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
