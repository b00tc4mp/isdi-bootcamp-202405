import 'dotenv/config'
import getUserName from './getUserName.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66acc905a4613054b12160b5', '66acc905a4613054b12160b5'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
