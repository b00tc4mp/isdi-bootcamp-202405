import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('lilideponte', '66a2159ae4df01c62b263e34'))
    .then(() => console.log('fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())