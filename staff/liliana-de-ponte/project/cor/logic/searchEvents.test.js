import 'dotenv/config'

import mongoose from 'mongoose'
import searchEvents from './searchEvents.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvents('66c1cff79369ddea9f4ad8eb', 'meditacion', 1, [41.476871, 2.306360]))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


