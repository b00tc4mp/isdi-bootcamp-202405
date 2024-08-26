import 'dotenv'
import mongoose from 'mongoose'

import makeReview from './makeReview'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => makeReview('66bc60030ac69a9a8f2b69fb', '66bc5fef0ac69a9a8f2b67d1', 'great game', 4))
    .then(review => console.log('review made', review))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())