import 'dotenv/config'
import mongoose from 'mongoose'
import getAllProps from './getAllProps.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllProps('66c45ff92c0dfea87a0518de'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())