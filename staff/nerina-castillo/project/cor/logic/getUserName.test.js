import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66b65c5b6c7b82909e9375ca', '66b65c5b6c7b82909e9375ca'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())