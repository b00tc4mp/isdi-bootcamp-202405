import 'dotenv/config'
import toggleLikeEvent from './toggleLikeEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikeEvent("66c60ae4a77f010bfa71ee16", "66c609f3a7cd31204308dcaf"))
    .then(() => console.log('like event toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())