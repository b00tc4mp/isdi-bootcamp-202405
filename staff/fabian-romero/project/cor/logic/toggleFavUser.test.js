import 'dotenv/config'
import toggleFavUser from './toggleFavUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavUser('66cc3c0e29e5a72c5e68303a', '66cc3c5901d704cbb4af4cc7'))
    .then(() => console.log('Fav user toggle'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

