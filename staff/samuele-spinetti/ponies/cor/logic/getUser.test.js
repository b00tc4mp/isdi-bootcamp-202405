import 'dotenv/config'
import getUser from './getUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUser('66acc905a4613054b12160b5', '66acc905a4613054b12160b5'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

