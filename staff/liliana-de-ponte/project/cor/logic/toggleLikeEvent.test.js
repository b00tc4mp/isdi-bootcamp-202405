import 'dotenv/config'
import toggleLikeEvent from './toggleLikeEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikeEvent('66be0443008d1c2263bc294b', '66be041252b2e9b2717872f6'))
    .then(() => console.log('like event topggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())