import 'dotenv/config'
import toggleSaveNews from './toggleSaveNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleSaveNews('66c34034294b7be14d9543e9', '66c33e6806cbe11b261c9768'))
    .then(() => console.log('save news toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())