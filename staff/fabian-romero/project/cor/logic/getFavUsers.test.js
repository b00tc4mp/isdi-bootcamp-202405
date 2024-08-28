import 'dotenv/config'
import getFavUsers from './getFavUsers.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getFavUsers('66c740911976de707adf0ab0'))
    .then(() => console.log('Favs'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())