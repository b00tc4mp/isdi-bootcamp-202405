import 'dotenv/config'
import mongoose from 'mongoose'
import deleteEvent from './deleteEvent.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteEvent('66bb9d8227e617a75fe93a92', '66bb9dee8c6a73e3456681f7'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())