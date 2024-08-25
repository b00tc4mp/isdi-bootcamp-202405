import 'dotenv/config'

import getPetsittersDetails from './getPetsitterDetails.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPetsittersDetails('66cb5f4d228f2efac2900ee2'))
    .then(petsitters => console.log(petsitters))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())