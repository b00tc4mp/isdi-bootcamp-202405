import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('julito', 'julitocalemas', 'label', 'julito@calemas.com', 'julitocalemas123', 'julitocalemas123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())