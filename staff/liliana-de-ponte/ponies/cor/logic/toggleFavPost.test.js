import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acd8fe0657af2f48044c0a', '66acd787cb749efdab22f8f2'))
    .then(() => console.log('fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())