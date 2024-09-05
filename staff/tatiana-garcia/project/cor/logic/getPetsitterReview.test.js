import 'dotenv/config'
import mongoose from 'mongoose'

import getPetsitterReview from './getPetsitterReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPetsitterReview('66d988b9e935d3037007f4be'))
    .then(petsitter => console.log(petsitter))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())