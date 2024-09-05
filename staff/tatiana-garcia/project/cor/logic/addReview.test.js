import 'dotenv/config'

import mongoose from 'mongoose'

import addReview from './addReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => addReview('66d988b9e935d3037007f4be', '66d988a804fc191d11113029', 'son los mejores', 5))
    .then(review => console.log('review made', review))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())