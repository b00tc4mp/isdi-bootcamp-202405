import 'dotenv/config'
import registerPetsitterUser from './registerPetsitterUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerPetsitterUser('Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tat@garcia.com', '123123123', '123123123'))
    .then(() => console.log('petsitter registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())