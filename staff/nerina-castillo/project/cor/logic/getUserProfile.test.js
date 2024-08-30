import 'dotenv/config'
import mongoose from 'mongoose'
import getUserProfile from './getUserProfile.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserProfile('66d077916d016a351e34bdbe'))
    .then(userProfile => console.log(userProfile))
    .catch(error => console.log(error))
    .finally(() => mongoose.disconnect())