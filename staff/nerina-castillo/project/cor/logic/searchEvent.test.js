import 'dotenv/config'
import mongoose from 'mongoose'
import searchEvent from './searchEvent.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvent('66c077cd70618b1b8e5fae31', 'concert', 1, [40.7128, -74.006]))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())