import 'dotenv/config'

import mongoose from 'mongoose'

import addReview from './addReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => addReview('66cc30605e0e1ff3003b3ef6', '66cc32b55e0e1ff3003b3efa', 'son los mejores', 5))
    .then(review => console.log('review made', review))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())