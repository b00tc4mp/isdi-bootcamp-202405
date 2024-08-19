import 'dotenv/config'

import mongoose from 'mongoose'
import searchEvents from './searchEvents.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchEvents('66c2f96e5ab09b17a9ef3c5e', 'crecimiento', 1, [41.38250732128532, 2.1530769847253053]))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


