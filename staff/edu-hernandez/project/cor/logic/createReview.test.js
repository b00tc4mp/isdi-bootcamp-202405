import 'dotenv/config'
import createReview from './createReview.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createReview('66fbe6f302176ae20eaf6535', '66fd2813dcee4393a2e0120b', 5, 'Review test from cor'))
    .then(() => console.log('review created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())