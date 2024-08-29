
import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('nacho', 'llamas', 'nacho@llamas.com', 'nachollamas', 'x1234567ñ', '123123123', '123123123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())