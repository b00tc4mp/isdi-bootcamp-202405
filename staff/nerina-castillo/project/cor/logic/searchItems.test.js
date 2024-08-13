import 'dotenv/config'
import mongoose from 'mongoose'

import searchItems from './searchItems.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchItems('66bb5c4680c11b0ae17525f9', 'o'))
    .then(item => console.log(item))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())