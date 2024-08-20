import 'dotenv/config'

import deletePetsitter from './deletePetsitter.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePetsitter('66c44e188e4e3b820277485d', '66c4b3e1febdd53d01bd6f3e'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())