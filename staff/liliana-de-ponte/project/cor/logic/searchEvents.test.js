import 'dotenv/config'

import mongoose from 'mongoose'
import searchEvents from './searchEvents.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvents('66bf6e7ef9d6db6884ef3694', 'el'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())