import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    // .then(() => registerUser('Musa', 'Nespi', 'musa@nespi.com', 'musa', '123123123', '123123123'))
    .then(() => registerUser('Samu', 'Spine', 'samu@spine.com', 'samu', '123123123', '123123123'))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())