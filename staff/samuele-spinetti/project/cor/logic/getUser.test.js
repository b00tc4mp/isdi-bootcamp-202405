import 'dotenv/config'
import getUser from './getUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUser('66cda1786dad81a083c9afd5', '66cdb30729cd821604d7cead'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

