import 'dotenv/config'
import mongoose from 'mongoose'
import getUserProfile from './getUserProfile.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserProfile('66e862a76b0c29f62c502ac7'))
    .then(userProfile => console.log(userProfile))
    .catch(error => console.log(error))
    .finally(() => mongoose.disconnect())