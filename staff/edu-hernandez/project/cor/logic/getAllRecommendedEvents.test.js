import getAllRecommendedEvents from './getAllRecommendedEvents.js'
import 'dotenv/config'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllRecommendedEvents('66f17998140f8192d2a72103'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())