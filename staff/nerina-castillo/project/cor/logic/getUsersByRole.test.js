import 'dotenv/config'
import mongoose from 'mongoose'
import getUsersByRole from './getUsersByRole.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUsersByRole('band'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())