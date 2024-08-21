import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('Ester', 'Colero', 'ester@colero.com', '966365333', 'calle Dolores 23, Cuenca', '123123123', '123123123'))
    .then(() => console.log('User registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())