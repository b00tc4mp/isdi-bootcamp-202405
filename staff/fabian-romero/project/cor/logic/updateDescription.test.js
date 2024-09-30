import 'dotenv/config'
import updateDescription from './updateDescription.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateDescription('66eca0fde06749ab87b1522a', 'señor gallardix'))
    .then(() => console.log('description updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
