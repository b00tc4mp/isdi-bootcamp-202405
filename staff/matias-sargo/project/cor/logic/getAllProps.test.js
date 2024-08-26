import 'dotenv/config'
import mongoose from 'mongoose'
import getAllProps from './getAllProps.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllProps('66cc35915df4f59e0a6a1571'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())