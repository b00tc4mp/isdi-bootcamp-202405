import 'dotenv/config'
import mongoose from 'mongoose'

import deleteReview from './deleteReview.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteReview('66acb2b1730b0f09da259589'))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())