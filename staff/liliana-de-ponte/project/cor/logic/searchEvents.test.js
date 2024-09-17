import 'dotenv/config'

import mongoose from 'mongoose'
import searchEvents from './searchEvents.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvents('66e4069585b2cd070a456d85', 'Crecimiento', 1, [41.38249928035046, 2.152969735831627]))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


