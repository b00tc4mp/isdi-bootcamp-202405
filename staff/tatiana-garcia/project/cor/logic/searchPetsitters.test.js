import 'dotenv/config'
import searchPetsitters from './searchPetsitters.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchPetsitters('madrid'))
    .then(petsitter => console.log(petsitter))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())