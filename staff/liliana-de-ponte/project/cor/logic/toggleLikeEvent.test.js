import 'dotenv/config'
import toggleLikeEvent from './toggleLikeEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikeEvent('66bf44704640ed8f4159c573', '66bf44b2287390a170d611a8'))
    .then(() => console.log('like event toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())