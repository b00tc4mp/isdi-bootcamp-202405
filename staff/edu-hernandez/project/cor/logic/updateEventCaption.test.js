import 'dotenv/config'
import updateEventCaption from './updateEventCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateEventCaption('66ec5b397cbf35a98a88ab9a', '66ec4d00c2e7bff23c04b90f', 'Updating from cor'))
    .then(() => console.log('event caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())