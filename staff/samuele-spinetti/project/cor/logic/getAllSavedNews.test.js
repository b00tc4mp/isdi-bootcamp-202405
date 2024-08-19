import 'dotenv/config'
import getAllSavedNews from './getAllSavedNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllSavedNews('66c34034294b7be14d9543e9'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())