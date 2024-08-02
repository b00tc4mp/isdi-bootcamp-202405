import 'dotenv/config'
import getUserName from "./getUserName.js"

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66acd71db43870a515ffb02f', '66acd8fe0657af2f48044c0a'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
