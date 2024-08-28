import 'dotenv/config'
import updateDescription from './updateDescription.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateDescription('66c7532016dfc6ec94e3ebc6', 'señor gallardix'))
    .then(() => console.log('description updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
