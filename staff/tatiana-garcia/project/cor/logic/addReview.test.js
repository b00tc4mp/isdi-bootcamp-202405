import 'dotenv/config'

import mongoose from 'mongoose'

import addReview from './addReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => addReview('66ddc6e8b28e9805501b001c', '66ddc6e1e7711e9350f1aa75', 'son los mejores', 5))
    .then(review => console.log('review made', review))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())