import 'dotenv/config'
import updateDescription from './updateDescription.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateDescription('66eda1f212b0c21817958165', 'mi nombre es fulano de tal'))
    .then(() => console.log('description updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())