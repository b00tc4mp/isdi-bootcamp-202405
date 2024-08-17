import 'dotenv/config'
import toggleSaveNews from './toggleSaveNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleSaveNews('66bf56465dd3b3b6dfe5f2b6', '66bf550d39b41dac8e0e4e76'))
    .then(() => console.log('save news toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())