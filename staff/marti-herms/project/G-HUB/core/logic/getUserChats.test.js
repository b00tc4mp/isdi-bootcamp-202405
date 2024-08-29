import 'dotenv/config'
import mongoose from 'mongoose'

import getUserChats from './getUserChats.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserChats('66acb2b1730b0f09da259589', '66acb2b1730b0f09da259589'))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())