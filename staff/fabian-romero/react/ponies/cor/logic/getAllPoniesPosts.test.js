import 'dotenv/config'
import getAllPoniesPosts from './getAllPoniesPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPoniesPosts('66acd7e6f28f138bd0f0752d'))
    .then(post => console.log(post))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())