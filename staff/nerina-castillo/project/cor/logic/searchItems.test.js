import 'dotenv/config'
import mongoose, { mongo } from 'mongoose'

import searchItems from './searchItems.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchItems('66b8f62c517338cebefd549c', 'la'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())