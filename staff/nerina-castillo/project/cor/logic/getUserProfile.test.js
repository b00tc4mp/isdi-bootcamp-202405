import 'dotenv/config'
import mongoose from 'mongoose'
import getUserProfile from './getUserProfile.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserProfile('66eda1f212b0c21817958165'))
    .then(userProfile => console.log(userProfile))
    .catch(error => console.log(error))
    .finally(() => mongoose.disconnect())