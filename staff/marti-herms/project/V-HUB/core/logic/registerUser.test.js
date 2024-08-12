import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('eden', 'marti@herms.com', '123123123', 'regular'))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
