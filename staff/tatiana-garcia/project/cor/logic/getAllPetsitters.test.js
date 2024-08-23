import 'dotenv/config'

import getAllPetsitters from './getAllPetsitters.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPetsitters('66c7ab2f23b99d6014a4e613'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())