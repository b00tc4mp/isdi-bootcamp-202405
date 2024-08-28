import 'dotenv/config'
import getUserName from './getUserName.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66cdc67e46ef536d3d98ec8d', '66cdc67e46ef536d3d98ec8d'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())